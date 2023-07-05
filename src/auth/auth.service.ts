/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FakeAuthRepository } from '../../test/auth/auth.service.spec';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  authRepository = new FakeAuthRepository();

  async signUp(body) {
    const { userId, password } = body;
    const user = await this.authRepository.findUserById(userId);
    if (user) {
      throw new BadRequestException('이미 존재하는 id입니다');
    }

    await this.authRepository.create(body);
  }

  async signIn(body) {
    const { userId, password } = body;
    const user = await this.authRepository.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException(
        '아이디 혹은 비밀번호가 올바르지 않습니다.',
      );
    }
    if (password !== user.password) {
      throw new UnauthorizedException(
        '아이디 혹은 비밀번호가 올바르지 않습니다.',
      );
    }

    const payload = { userId: user.userId, sub: user.id };
    const access_token = this.jwtService.sign(payload, {
      secret: 'secret',
      expiresIn: '60m',
    });
    console.log(access_token);
    return { access_token };
  }
}

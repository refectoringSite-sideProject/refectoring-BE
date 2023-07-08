/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FakeAuthRepository } from '../../test/auth/auth.service.spec';
import { JwtService } from '@nestjs/jwt';
// import { authRepository } from '../../test/auth/auth.service.spec';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  authRepository: FakeAuthRepository;

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
    const accessToken = this.generateJwt(payload, 'access');
    return { accessToken };
  }

  async generateJwt(payload, typeOfToken) {
    if (typeOfToken === 'access') {
      // console.log(process.env.SECRET_KEY_ACCESS);
      const accessToken = this.jwtService.sign(payload, {
        secret: '왜안대',
        expiresIn: '60m',
      });
      return { accessToken };
    }
    if (typeOfToken === 'refresh') {
      const refreshToken = this.jwtService.sign(payload, {
        secret: '와이!!!!',
        expiresIn: '12h',
      });
      return { refreshToken };
    }
  }
}

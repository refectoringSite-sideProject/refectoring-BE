import {
  Inject,
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthRepository } from './auth.IRepository';
import { SignUpInputDto } from './dto/input/sign-up.input.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUpInputDto) {
    const { email, password, nickname } = body;
    const user = await this.authRepository.findUserByEmail(body);
    if (user) {
      throw new BadRequestException('이미 존재하는 id입니다');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.authRepository.create({
      email,
      password: hashedPassword,
      nickname,
    });
    return;
  }

  async signIn(body) {
    const { userId, password } = body;
    const user = await this.authRepository.findUserByEmail(userId);
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

    const payload = { email: user.email, sub: user.id };
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

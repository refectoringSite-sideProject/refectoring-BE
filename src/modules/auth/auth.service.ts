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
import { SignInInputDto } from './dto/input/sign-in.input.dto';
import { SignInOutputDto } from './dto/output/sign-in.output.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUpInputDto): Promise<void> {
    const { email, password, nickname } = body;
    const user = await this.authRepository.findUserByEmail(email);
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

  async signIn(body: SignInInputDto): Promise<SignInOutputDto> {
    const { email, password } = body;
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        '아이디 혹은 비밀번호가 올바르지 않습니다.',
      );
    }
    const isMatch = await bcrypt.compare(password, user._password);
    if (!isMatch) {
      throw new UnauthorizedException(
        '아이디 혹은 비밀번호가 올바르지 않습니다.',
      );
    }
    const payload = { email: user._email, sub: user._id };
    const accessToken = this.generateJwt(payload, 'access');
    const refreshToken = this.generateJwt(payload, 'refresh');

    return { accessToken, refreshToken };
  }

  generateJwt(payload, typeOfToken: string): string {
    if (typeOfToken === 'access') {
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY_ACCESS,
        expiresIn: process.env.EXPIRES_IN_ACCESS,
      });
      return accessToken;
    }
    if (typeOfToken === 'refresh') {
      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY_REFRESH,
        expiresIn: process.env.EXPIRES_IN_REFRESH,
      });
      return refreshToken;
    }
  }
}

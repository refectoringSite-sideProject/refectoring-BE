import {
  Inject,
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IAuthRepository } from "./auth.IRepository";
import { SignUpInputDto } from "./dto/input/sign-up.input.dto";
import * as bcrypt from "bcrypt";
import { SignInInputDto } from "./dto/input/sign-in.input.dto";
import { SignInOutputDto } from "./dto/output/sign-in.output.dto";
import axios from "axios";
import { Payload } from "./jwt/jwt.payload";
import { SaveUserPhoneNumberInputDto } from "./dto/input/saveUserPhoneNumber.dto";

@Injectable()
export class AuthService {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService
  ) {}

  async signUp(body: SignUpInputDto): Promise<void> {
    const { email, password, nickname } = body;
    const user = await this.authRepository.findUserByEmail(email);
    if (user) {
      throw new BadRequestException("이미 존재하는 id입니다");
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
        "아이디 혹은 비밀번호가 올바르지 않습니다."
      );
    }
    const isMatch = await bcrypt.compare(password, user._password);
    if (!isMatch) {
      throw new UnauthorizedException(
        "아이디 혹은 비밀번호가 올바르지 않습니다."
      );
    }

    const payload = { sub: user._id };
    const accessToken = this.generateJwt(payload, "access");
    const refreshToken = this.generateJwt(payload, "refresh");
    const isNewUser = false;

    return { accessToken, refreshToken, isNewUser };
  }

  generateJwt(payload: Payload, typeOfToken: string): string {
    if (typeOfToken === "access") {
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY_ACCESS,
        expiresIn: process.env.EXPIRES_IN_ACCESS,
      });
      return accessToken;
    }
    if (typeOfToken === "refresh") {
      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY_REFRESH,
        expiresIn: process.env.EXPIRES_IN_REFRESH,
      });
      return refreshToken;
    }
  }

  async kakaoLogin(code: string): Promise<SignInOutputDto> {
    const kakaoUser = await this.getKakaoUserInfo(code);
    let user = await this.authRepository.findUserBySocialId(kakaoUser.id);

    let isNewUser = false;
    if (!user) {
      user = await this.authRepository.createBySocialId({
        email: kakaoUser.kakao_account.email,
        socialId: kakaoUser.id,
        nickname: kakaoUser.properties.nickname,
        profileImg: kakaoUser.properties.thumbnail_image,
      });
      isNewUser = true;
    }

    const payload = { sub: user._id };
    const accessToken = this.generateJwt(payload, "access");
    const refreshToken = this.generateJwt(payload, "refresh");

    return { accessToken, refreshToken, isNewUser };
  }

  async getKakaoUserInfo(code: string) {
    const redirectURI = "http://localhost:3000/kakao/callback";
    const clientID = process.env.KAKAO_CLIENT_ID;

    try {
      const tokenResponse = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientID}&redirect_uri=${redirectURI}&code=${code}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      const accessToken = tokenResponse.data.access_token;
      const userResponse = await axios.get(
        "https://kapi.kakao.com/v2/user/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const userInfo = userResponse.data;
      return userInfo;
    } catch (err) {
      console.log(err);
    }
  }

  async saveUserPhoneNumber(
    body: SaveUserPhoneNumberInputDto,
    UserId: number
  ): Promise<void> {
    await this.authRepository.saveUserPhoneNumber(body, UserId);
    return;
  }
}

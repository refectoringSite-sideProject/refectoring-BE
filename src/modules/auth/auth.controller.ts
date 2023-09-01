import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "src/common/decorators/user.decorator";
import { AuthService } from "./auth.service";
import { SaveUserPhoneNumberInputDto } from "../user/dto/input/saveUserPhoneNumber.dto";
import { SignInInputDto } from "./dto/input/sign-in.input.dto";
import { SignUpInputDto } from "./dto/input/sign-up.input.dto";
import { SignInOutputDto } from "./dto/output/sign-in.output.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "회원가입 API" })
  @Post("signUp")
  async signUp(@Body() body: SignUpInputDto): Promise<void> {
    await this.authService.signUp(body);
    return;
  }

  @ApiOperation({ summary: "로그인 API" })
  @Post("signIn")
  async signIn(@Body() body: SignInInputDto): Promise<SignInOutputDto> {
    return await this.authService.signIn(body);
  }

  @ApiOperation({ summary: "카카오 로그인 API" })
  @Post("kakao/callback/:code")
  async kakaoAuthCallback(
    @Param("code") code: string
  ): Promise<SignInOutputDto> {
    return await this.authService.kakaoLogin(code);
  }
}

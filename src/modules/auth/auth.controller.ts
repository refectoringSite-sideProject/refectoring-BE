import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInInputDto } from './dto/input/sign-in.input.dto';
import { SignUpInputDto } from './dto/input/sign-up.input.dto';
import { SignInOutputDto } from './dto/output/sign-in.output.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원가입 API' })
  @Post('signUp')
  async signUp(@Body() body: SignUpInputDto): Promise<void> {
    await this.authService.signUp(body);
    return;
  }

  @Post('signIn')
  async signIn(@Body() body: SignInInputDto): Promise<SignInOutputDto> {
    return await this.authService.signIn(body);
  }
}

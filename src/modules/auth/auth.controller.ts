/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpInputDto } from './dto/input/sign-up.input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원가입 API' })
  @Post('signUp')
  async signUp(@Body() body: SignUpInputDto): Promise<void> {
    await this.authService.signUp(body);
    return;
  }
}

/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignUpInputDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'honggd@gmail.com',
    description: '이메일',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\d!@#$%^&*()]{8,20}/)
  @ApiProperty({
    example: 'asdf1234!',
    description: '비밀번호',
    required: true,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[가-힣a-zA-Z]+$/)
  @ApiProperty({
    example: '길똥이',
    description: '유저 닉네임',
    required: true,
  })
  nickname: string;
}

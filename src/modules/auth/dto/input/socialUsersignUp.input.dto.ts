import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class SocialUserSignUpInputDto {
  @IsEmail()
  @ApiProperty({
    example: "honggd@gmail.com",
    description: "이메일",
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "1234567890",
    description: "social ID",
    required: true,
  })
  socialId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "길똥이",
    description: "유저 닉네임",
    required: true,
  })
  nickname: string;

  @IsString()
  @ApiProperty({
    example: "img_110x110.jpg",
    description: "유저 프로필 이미지",
  })
  profileImg: string;
}

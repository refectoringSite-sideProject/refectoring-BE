/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyEmailInputDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

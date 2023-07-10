/* eslint-disable prettier/prettier */
import { SignUpInputDto } from './dto/input/sign-up.input.dto';
import { VerifyEmailInputDto } from './dto/input/verify-email.input.dto';

export interface IAuthRepository {
  create(signUpInputDto: SignUpInputDto): Promise<void>;
  findUserByEmail(email: VerifyEmailInputDto);
  findUserByIdWithoutPassword(userId: number);
}

export const IAuthRepository = Symbol('IAuthRepository');

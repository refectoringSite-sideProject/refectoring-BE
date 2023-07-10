import { SignUpInputDto } from './dto/input/sign-up.input.dto';

export interface IAuthRepository {
  create(signUpInputDto: SignUpInputDto): Promise<void>;
  findUserByEmail(signUpInputDto: SignUpInputDto);
  findUserByIdWithoutPassword(userId: number);
}

export const IAuthRepository = Symbol('IAuthRepository');

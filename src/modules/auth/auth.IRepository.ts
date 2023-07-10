import { SignUpInputDto } from './dto/input/sign-up.input.dto';
import { UserOutputDto } from './dto/output/user.output.dto';

export interface IAuthRepository {
  create(signUpInputDto: SignUpInputDto): Promise<void>;
  findUserByEmail(email: string): Promise<UserOutputDto>;
}

export const IAuthRepository = Symbol('IAuthRepository');

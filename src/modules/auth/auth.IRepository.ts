import { SaveUserPhoneNumberInputDto } from "./dto/input/saveUserPhoneNumber.dto";
import { SignUpInputDto } from "./dto/input/sign-up.input.dto";
import { SocialUserSignUpInputDto } from "./dto/input/socialUsersignUp.input.dto";
import { UserOutputDto } from "./dto/output/user.output.dto";

export interface IAuthRepository {
  create(signUpInputDto: SignUpInputDto): Promise<void>;
  findUserByEmail(email: string): Promise<UserOutputDto>;
  findUserBySocialId(socailId: string): Promise<UserOutputDto>;
  createBySocialId(
    socialUserSignUpInputDto: SocialUserSignUpInputDto
  ): Promise<UserOutputDto>;
  saveUserPhoneNumber(
    body: SaveUserPhoneNumberInputDto,
    userId: number
  ): Promise<void>;
}

export const IAuthRepository = Symbol("IAuthRepository");

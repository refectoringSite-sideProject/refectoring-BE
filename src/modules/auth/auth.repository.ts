import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { IAuthRepository } from "./auth.IRepository";
import { SaveUserPhoneNumberInputDto } from "./dto/input/saveUserPhoneNumber.dto";
import { SignUpInputDto } from "./dto/input/sign-up.input.dto";
import { SocialUserSignUpInputDto } from "./dto/input/socialUsersignUp.input.dto";
import { UserOutputDto } from "./dto/output/user.output.dto";

export class AuthRepository implements IAuthRepository {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async create(signUpInputDto: SignUpInputDto): Promise<void> {
    const newUser = this.userModel.create();
    newUser.email = signUpInputDto.email;
    newUser.password = signUpInputDto.password;
    newUser.nickname = signUpInputDto.nickname;
    newUser.point = 0;
    newUser.TierId = 1;
    await this.userModel.save(newUser);
  }

  async findUserByEmail(email: string): Promise<UserOutputDto> {
    const result = await this.userModel.findOne({ where: { email } });
    return plainToInstance(UserOutputDto, result);
  }

  async findUserBySocialId(socialId: string): Promise<UserOutputDto> {
    const result = await this.userModel.findOne({ where: { socialId } });
    return plainToInstance(UserOutputDto, result);
  }

  async createBySocialId(
    socialUserSignUpInputDto: SocialUserSignUpInputDto
  ): Promise<UserOutputDto> {
    const newUser = this.userModel.create();
    newUser.email = socialUserSignUpInputDto.email;
    newUser.socialId = socialUserSignUpInputDto.socialId;
    newUser.point = 0;
    newUser.nickname = socialUserSignUpInputDto.nickname;
    newUser.profileImg = socialUserSignUpInputDto.profileImg;
    newUser.TierId = 1;
    const result = await this.userModel.save(newUser);
    return plainToInstance(UserOutputDto, result);
  }

  async saveUserPhoneNumber(
    body: SaveUserPhoneNumberInputDto,
    UserId: number
  ): Promise<void> {
    const phoneNumber = body.phoneNumber;
    await this.userModel.update({ id: UserId }, { phoneNumber });
    return;
  }
}

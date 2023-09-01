import { Inject, Injectable } from "@nestjs/common";
import { SaveUserPhoneNumberInputDto } from "./dto/input/saveUserPhoneNumber.dto";
import { IUserRepository } from "./user.IRepository";

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository
  ) {}

  async saveUserPhoneNumber(
    body: SaveUserPhoneNumberInputDto,
    UserId: number
  ): Promise<void> {
    await this.userRepository.saveUserPhoneNumber(body, UserId);
    return;
  }
}

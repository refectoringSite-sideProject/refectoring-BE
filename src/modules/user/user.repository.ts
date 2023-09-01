import { Injectable } from "@nestjs/common";
import { IUserRepository } from "./user.IRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { SaveUserPhoneNumberInputDto } from "./dto/input/saveUserPhoneNumber.dto";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async saveUserPhoneNumber(
    body: SaveUserPhoneNumberInputDto,
    UserId: number
  ): Promise<void> {
    const phoneNumber = body.phoneNumber;
    await this.userModel.update({ id: UserId }, { phoneNumber });
    return;
  }
}

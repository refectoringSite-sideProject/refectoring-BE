import { SaveUserPhoneNumberInputDto } from "./dto/input/saveUserPhoneNumber.dto";

export interface IUserRepository {
  saveUserPhoneNumber(
    body: SaveUserPhoneNumberInputDto,
    userId: number
  ): Promise<void>;
}

export const IUserRepository = Symbol("IUserRepository");

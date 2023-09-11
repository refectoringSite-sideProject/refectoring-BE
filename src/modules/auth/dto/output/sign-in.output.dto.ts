import { User } from "src/entities/user.entity";
import { UserOutputDto } from "./user.output.dto";

export class SignInOutputDto {
  user: UserOutputDto;
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
}

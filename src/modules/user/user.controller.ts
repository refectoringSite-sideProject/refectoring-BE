import { Controller, Body, Patch, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/common/decorators/user.decorator";
import { SaveUserPhoneNumberInputDto } from "./dto/input/saveUserPhoneNumber.dto";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "휴대폰 번호 저장 API" })
  @Patch("phoneNumber")
  @UseGuards(AuthGuard("jwt"))
  async saveUserPhoneNumber(
    @Body() body: SaveUserPhoneNumberInputDto,
    @User() User
  ): Promise<void> {
    return await this.userService.saveUserPhoneNumber(body, User.sub);
  }
}

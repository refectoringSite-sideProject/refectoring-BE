import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SaveUserPhoneNumberInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "01012341234",
    description: "휴대폰 번호",
    required: true,
  })
  phoneNumber: string;
}

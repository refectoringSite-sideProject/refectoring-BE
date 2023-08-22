import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRecommentInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "대댓글 남기고 갑니다.",
    description: "대댓글 내용",
    required: true,
  })
  content: string;
}

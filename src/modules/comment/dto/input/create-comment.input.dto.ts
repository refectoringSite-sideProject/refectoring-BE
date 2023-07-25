import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "댓글 남기고 갑니다.",
    description: "댓글 내용",
    required: true,
  })
  content: string;
}

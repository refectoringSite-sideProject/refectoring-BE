import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCommentInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "댓글 수정합니다.",
    description: "댓글 변경 내용",
    required: true,
  })
  content: string;
}

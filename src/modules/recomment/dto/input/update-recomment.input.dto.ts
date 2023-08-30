import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateRecommentInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "대댓글 수정합니다.",
    description: "대댓글 변경 내용",
    required: true,
  })
  content: string;
}

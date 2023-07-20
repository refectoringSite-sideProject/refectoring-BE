import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePostInputDto {
  @ApiProperty({ type: String, description: "게시글의 제목", example: "제목" })
  @IsString()
  title: string;

  @ApiProperty({ type: String, description: "게시글의 내용", example: "내용" })
  @IsString()
  content: string;

  @ApiProperty({ type: Number, description: "카테고리 번호", example: 1 })
  @IsNumber()
  CategoryId: number;
}

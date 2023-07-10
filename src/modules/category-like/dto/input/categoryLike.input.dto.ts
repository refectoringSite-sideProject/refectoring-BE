import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CategoryLikeInputDto {
  @ApiProperty({
    type: Number,
    description: "카테고리 인덱스 아이디",
    example: 1,
  })
  @IsNumber()
  CategoryId: number;
}

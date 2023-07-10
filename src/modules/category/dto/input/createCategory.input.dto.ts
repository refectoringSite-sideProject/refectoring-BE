import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryInputDto {
  @ApiProperty({
    type: String,
    description: '카테고리 이름',
    example: '고민 게시판',
  })
  @IsString()
  category: string;
}

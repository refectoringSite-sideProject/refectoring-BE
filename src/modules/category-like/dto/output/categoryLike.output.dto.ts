import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CategoryLikeOuputDto {
  private CategoryId: number;
  private UserId: number;
}

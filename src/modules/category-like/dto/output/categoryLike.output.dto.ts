import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CategoryLikeOuputDto {
  private id: number;
  private CategoryId: number;
  private UserId: number;
}

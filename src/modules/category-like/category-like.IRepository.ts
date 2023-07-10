import { CategoryLikeInputDto } from "./dto/input/categoryLike.input.dto";
import { CategoryLikeOuputDto } from "./dto/output/categoryLike.output.dto";

export interface ICategoryLikeRepository {
  findCategoryLike(
    body: CategoryLikeInputDto,
    UserId: number
  ): Promise<CategoryLikeOuputDto>;
  createCategoryLike(body: CategoryLikeInputDto, UserId: number): Promise<void>;
  deleteCategoryLike(body: CategoryLikeInputDto, UserId: number): Promise<void>;
}

export const ICategoryLikeRepository = Symbol("ICategoryLikeRepository");

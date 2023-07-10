import { Inject, Injectable } from "@nestjs/common";
import { ICategoryLikeRepository } from "./category-like.IRepository";
import { CategoryLikeInputDto } from "./dto/input/categoryLike.input.dto";

@Injectable()
export class CategoryLikeService {
  constructor(
    @Inject(ICategoryLikeRepository)
    private readonly categoryLikeRepository: ICategoryLikeRepository
  ) {}

  async categoryLike(
    body: CategoryLikeInputDto,
    UserId: number
  ): Promise<void> {
    const isCategoryLike = await this.categoryLikeRepository.findCategoryLike(
      body,
      UserId
    );

    if (isCategoryLike) {
      this.deleteCategoryLike(body, UserId);
      return;
    }

    if (!isCategoryLike) {
      this.addCategoryLike(body, UserId);
      return;
    }
  }

  async addCategoryLike(
    body: CategoryLikeInputDto,
    UserId: number
  ): Promise<void> {
    await this.categoryLikeRepository.createCategoryLike(body, UserId);
    return;
  }

  async deleteCategoryLike(
    body: CategoryLikeInputDto,
    UserId: number
  ): Promise<void> {
    await this.categoryLikeRepository.deleteCategoryLike(body, UserId);
    return;
  }
}

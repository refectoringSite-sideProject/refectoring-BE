import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryLike } from "src/entities/categoryLike.entity";
import { Repository } from "typeorm";
import { ICategoryLikeRepository } from "./category-like.IRepository";
import { CategoryLikeInputDto } from "./dto/input/categoryLike.input.dto";
import { CategoryLikeOuputDto } from "./dto/output/categoryLike.output.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class CategoryLikeRepository implements ICategoryLikeRepository {
  constructor(
    @InjectRepository(CategoryLike)
    private categoryLikeModel: Repository<CategoryLike>
  ) {}

  async findCategoryLike(
    body: CategoryLikeInputDto,
    UserId: number
  ): Promise<CategoryLikeOuputDto> {
    const { CategoryId } = body;

    const result = await this.categoryLikeModel.findOne({
      where: { CategoryId, UserId },
    });
    return plainToInstance(CategoryLikeOuputDto, result);
  }

  async createCategoryLike(
    body: CategoryLikeInputDto,
    UserId: number
  ): Promise<void> {
    const { CategoryId } = body;

    const newCategoryLike = this.categoryLikeModel.create();
    newCategoryLike.CategoryId = CategoryId;
    newCategoryLike.UserId = UserId;
    await this.categoryLikeModel.save(newCategoryLike);
    return;
  }

  async deleteCategoryLike(
    body: CategoryLikeInputDto,
    UserId: number
  ): Promise<void> {
    const { CategoryId } = body;

    await this.categoryLikeModel.delete({ CategoryId, UserId });
    return;
  }
}

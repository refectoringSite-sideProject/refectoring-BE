import { Injectable } from "@nestjs/common";
import { ICategoryRepository } from "./category.IRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { Repository } from "typeorm";
import { CategoryListOutputDto } from "./dto/output/categoryList.output.dto";
import { plainToInstance } from "class-transformer";
import { CreateCategoryInputDto } from "./dto/input/createCategory.input.dto";

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(Category) private categoryModel: Repository<Category>
  ) {}

  async findAllCategoryList(): Promise<CategoryListOutputDto[]> {
    const result = await this.categoryModel
      .createQueryBuilder("category")
      .getRawMany();
    return plainToInstance(CategoryListOutputDto, result);
  }

  async createCategory(body: CreateCategoryInputDto): Promise<void> {
    const { category } = body;
    const newCategory = this.categoryModel.create();
    newCategory.category = category;
    await this.categoryModel.save(newCategory);
    return;
  }
}

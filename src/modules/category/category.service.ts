import { Inject, Injectable } from '@nestjs/common';
import { ICategoryRepository } from './category.IRepository';
import { CreateCategoryInputDto } from './dto/input/createCategory.input.dto';
import { CategoryListOutputDto } from './dto/output/categoryList.output.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async getCategoryList(): Promise<CategoryListOutputDto[]> {
    const result = await this.categoryRepository.findAllCategoryList();
    return result;
  }

  async createCategory(body: CreateCategoryInputDto): Promise<void> {
    await this.categoryRepository.createCategory(body);
    return;
  }
}

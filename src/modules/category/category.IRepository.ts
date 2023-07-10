import { Category } from 'src/entities/category.entity';
import { CategoryListOutputDto } from './dto/output/categoryList.output.dto';
import { CreateCategoryInputDto } from './dto/input/createCategory.input.dto';

export interface ICategoryRepository {
  findAllCategoryList(): Promise<CategoryListOutputDto[]>;
  createCategory(body: CreateCategoryInputDto): Promise<void>;
}

export const ICategoryRepository = Symbol('ICategoryRepository');

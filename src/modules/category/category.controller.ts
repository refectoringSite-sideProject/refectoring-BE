import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryListOutputDto } from './dto/output/categoryList.output.dto';
import { CreateCategoryInputDto } from './dto/input/createCategory.input.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: '카테고리 리스트 불러오기' })
  @Get('list')
  async getCategoryList(): Promise<CategoryListOutputDto[]> {
    const result = await this.categoryService.getCategoryList();
    return result;
  }

  @ApiOperation({ summary: '새로운 카테고리 생성 - 어드민' })
  @Post()
  async createCategory(@Body() body: CreateCategoryInputDto): Promise<void> {
    await this.categoryService.createCategory(body);
    return;
  }
}

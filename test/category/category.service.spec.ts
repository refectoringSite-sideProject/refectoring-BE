import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../../src/modules/category/category.service';
import { ICategoryRepository } from '../../src/modules/category/category.IRepository';

const mockCategoryData = {
  categoryList: [
    {
      id: 1,
      category: '리펙토링',
    },
    {
      id: 2,
      category: '잡담',
    },
  ],
};
export class FakeCategoryRepository implements ICategoryRepository {
  async findAllCategoryList() {
    return mockCategoryData.categoryList;
  }

  async createCategory(category) {
    return;
  }
}

describe('CategoryService', () => {
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: ICategoryRepository, useClass: FakeCategoryRepository },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  describe('getCategoryList', () => {
    it('카테고리 리스트를 불러온다 - 성공', async () => {
      const result = await categoryService.getCategoryList();
      expect(result).toEqual(mockCategoryData.categoryList);
    });
  });

  describe('createCategory', () => {
    it('카테고리를 생성한다 - 생성', async () => {
      const category = '고민 게시판';
      const result = await categoryService.createCategory(category);
      expect(result).toBeNull;
    });
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { CategoryLikeService } from "../../src/modules/category-like/category-like.service";
import { ICategoryLikeRepository } from "../../src/modules/category-like/category-like.IRepository";
import { CategoryLikeInputDto } from "../../src/modules/category-like/dto/input/categoryLike.input.dto";
import { CategoryLikeOuputDto } from "../../src/modules/category-like/dto/output/categoryLike.output.dto";
import { plainToInstance } from "class-transformer";

const mockCategoryLikeData = {
  likedCategory: {
    id: 1,
    CategoryId: 1,
    UserId: 1,
  },

  unLikedCategory: null,
};

export class FakeCategoryLikeRepository implements ICategoryLikeRepository {
  async findCategoryLike(
    body: CategoryLikeInputDto,
    UserId: number
  ): Promise<CategoryLikeOuputDto> {
    const { CategoryId } = body;

    if (UserId === 1 && CategoryId === 1) {
      return plainToInstance(
        CategoryLikeOuputDto,
        mockCategoryLikeData.likedCategory
      );
    } else {
      return mockCategoryLikeData.unLikedCategory;
    }
  }

  createCategoryLike(
    body: CategoryLikeInputDto,
    UserId: number
  ): Promise<void> {
    return;
  }

  deleteCategoryLike(
    body: CategoryLikeInputDto,
    UserId: number
  ): Promise<void> {
    return;
  }
}

describe("CategoryLikeService", () => {
  let categoryLikeService: CategoryLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryLikeService,
        {
          provide: ICategoryLikeRepository,
          useClass: FakeCategoryLikeRepository,
        },
      ],
    }).compile();

    categoryLikeService = module.get<CategoryLikeService>(CategoryLikeService);
  });

  it("should be defined", () => {
    expect(categoryLikeService).toBeDefined();
  });

  describe("categoryLike", () => {
    it("카테고리 Like가 있을 경우 - 좋아요가 되어있을 경우", async () => {
      const body = { CategoryId: 1 };
      const spy = jest.spyOn(categoryLikeService, "deleteCategoryLike");
      const UserId = 1;
      await categoryLikeService.categoryLike(body, UserId);
      expect(spy).toHaveBeenCalledWith(body, UserId);
    });

    it("카테고리 Like가 없을 경우 - 좋아요가 되어있지 않을 경우", async () => {
      const body = { CategoryId: 2 };
      const spy = jest.spyOn(categoryLikeService, "addCategoryLike");
      const UserId = 1;
      await categoryLikeService.categoryLike(body, UserId);
      expect(spy).toHaveBeenCalledWith(body, UserId);
    });
  });
});

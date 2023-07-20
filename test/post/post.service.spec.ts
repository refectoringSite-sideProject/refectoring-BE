import { Test, TestingModule } from "@nestjs/testing";
import { PostService } from "../../src/modules/post/post.service";
import { IPostRepository } from "../../src/modules/post/post.IRepository";
import { CreatePostInputDto } from "../../src/modules/post/dto/input/createPost.input.dto";
import { IsCategoryOutputDto } from "../../src/modules/post/dto/output/isCategory.output.dto";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "@nestjs/common";

const categoryMockDate = {
  category: {
    id: 1,
    category: "category",
  },
};

export class FakePostRepository implements IPostRepository {
  createPost(body: CreatePostInputDto): Promise<void> {
    return;
  }

  async isCategory(CategoryId: number): Promise<IsCategoryOutputDto> {
    if (CategoryId === 1) {
      return plainToInstance(IsCategoryOutputDto, categoryMockDate.category);
    }
    return;
  }
}

describe("PostService", () => {
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        { provide: IPostRepository, useClass: FakePostRepository },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
  });

  it("should be defined", () => {
    expect(postService).toBeDefined();
  });

  describe("createPost", () => {
    it("입력받은 카테고리가 존재하지 않을 경우 에러 리턴 - 실패", async () => {
      const body = { title: "title", content: "content", CategoryId: 2 };
      await expect(postService.createPost(body)).rejects.toThrowError(
        new BadRequestException("존재하지 않는 카테고리 입니다")
      );
    });

    it("입력받은 값들이 정상일 경우 post를 생성 - 성공", async () => {
      const body = { title: "title", content: "content", CategoryId: 1 };
      const result = await postService.createPost(body);
      expect(result).toBeNull;
    });
  });
});

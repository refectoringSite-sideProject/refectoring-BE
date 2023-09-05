import { Test, TestingModule } from "@nestjs/testing";
import { PostService } from "../../src/modules/post/post.service";
import { IPostRepository } from "../../src/modules/post/post.IRepository";
import { CreatePostInputDto } from "../../src/modules/post/dto/input/createPost.input.dto";
import { IsCategoryOutputDto } from "../../src/modules/post/dto/output/isCategory.output.dto";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "@nestjs/common";
import { GetAllPostOutputDto } from "../../src/modules/post/dto/output/getAllPost.output.dto";
import { GetPostOutputDto } from "../../src/modules/post/dto/output/getPost.output.dto";

const categoryMockData = {
  category: {
    id: 1,
    category: "category",
  },

  getAllPost: [
    {
      post_id: 1,
      post_title: "title",
      commentCount: "0",
      likeCount: "0",
    },
  ],

  getPost: {
    post_id: 1,
    post_title: "title",
    post_content: "content",
    user_id: 1,
    user_nickname: "nickname",
    likeCount: "0",
  },

  getLatestPosts: [
    {
      post_id: 5,
      post_title: "글2",
      post_content: "글내용",
      post_tag: ["javascript", "nest.js"],
      post_UserId: 2,
      post_CategoryId: 1,
      post_createdAt: "2023-09-05T07:30:33.041Z",
      commentCount: "0",
      likeCount: "5",
    },
    {
      post_id: 4,
      post_title: "글1",
      post_content: "글내용",
      post_tag: ["javascript", "nest.js"],
      post_UserId: 2,
      post_CategoryId: 1,
      post_createdAt: "2023-09-05T07:20:40.259Z",
      commentCount: "0",
      likeCount: "3",
    },
    {
      post_id: 3,
      post_title: "글3",
      post_content: "글내용",
      post_tag: null,
      post_UserId: 2,
      post_CategoryId: 1,
      post_createdAt: "2023-09-05T07:18:25.982Z",
      commentCount: "0",
      likeCount: "0",
    },
  ],
  getBestPosts: [],
};

export class FakePostRepository implements IPostRepository {
  async createPost(body: CreatePostInputDto): Promise<void> {
    return;
  }

  async isCategory(CategoryId: number): Promise<IsCategoryOutputDto> {
    if (CategoryId === 1) {
      return plainToInstance(IsCategoryOutputDto, categoryMockData.category);
    }
    return;
  }

  async getAllPostByCategoryId(
    CategoryId: number
  ): Promise<GetAllPostOutputDto[]> {
    return plainToInstance(GetAllPostOutputDto, categoryMockData.getAllPost);
  }

  async getPostByPostId(
    CategoryId: number,
    PostId: number
  ): Promise<GetPostOutputDto> {
    return plainToInstance(GetPostOutputDto, categoryMockData.getPost);
  }

  async getLatestPosts(numberOfPosts: number): Promise<GetAllPostOutputDto[]> {
    return plainToInstance(
      GetAllPostOutputDto,
      categoryMockData.getLatestPosts
    );
  }

  async getBestPosts(numberOfPosts: number): Promise<GetAllPostOutputDto[]> {
    return plainToInstance(GetAllPostOutputDto, categoryMockData.getBestPosts);
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
      const body = {
        title: "title",
        content: "content",
        tag: ["java", "spring"],
        CategoryId: 2,
      };
      const UserId = 1;
      await expect(postService.createPost(body, UserId)).rejects.toThrowError(
        new BadRequestException("존재하지 않는 카테고리 입니다")
      );
    });

    it("입력받은 값들이 정상일 경우 post를 생성 - 성공", async () => {
      const body = {
        title: "title",
        content: "content",
        tag: ["java", "spring"],
        CategoryId: 1,
      };
      const UserId = 1;
      const result = await postService.createPost(body, UserId);
      expect(result).toBeNull;
    });

    it("최신글 조회 - 성공", async () => {
      const numberOfPosts = 3;
      const result = await postService.getLatestPosts(numberOfPosts);
      expect(result).toEqual(categoryMockData.getLatestPosts);
    });

    it("인기글 조회 - 성공", async () => {
      const numberOfPosts = 3;
      const result = await postService.getBestPosts(numberOfPosts);
      expect(result).toEqual(categoryMockData.getBestPosts);
    });
  });
});

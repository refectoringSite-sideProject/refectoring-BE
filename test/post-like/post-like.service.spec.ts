import { Test, TestingModule } from "@nestjs/testing";
import { PostLikeService } from "../../src/modules/post-like/post-like.service";
import { IPostLikeRepository } from "../../src/modules/post-like/post-like.IRepository";
import { PostOutputDto } from "../../src/modules/post-like/dto/output/post.output.dto";
import { PostLikeOutputDto } from "../../src/modules/post-like/dto/output/postLike.output.dto";
import { plainToInstance } from "class-transformer";
import { PostLikeRepository } from "../../src/modules/post-like/post-like.repository";
import { BadRequestException } from "@nestjs/common";

const postLikeMockData = {
  post: {
    id: 1,
    title: "title",
    content: "content",
    UserId: 1,
    CategoryId: 1,
  },

  postLike: {
    id: 1,
    PostId: 1,
    UserId: 1,
  },
};

export class FakePostLikeRepositroy implements IPostLikeRepository {
  async findPost(PostId: number): Promise<PostOutputDto> {
    if (PostId === 1) {
      return plainToInstance(PostOutputDto, postLikeMockData.post);
    }
  }

  async findPostLike(
    PostId: number,
    UserId: number
  ): Promise<PostLikeOutputDto> {
    if (PostId === 1 && UserId === 1) {
      return plainToInstance(PostLikeOutputDto, postLikeMockData.postLike);
    }
  }

  async createPostLike(PostId: number, UserId: number): Promise<void> {}

  async deletePostLike(PostId: number, UserId: number): Promise<void> {}
}

describe("PostLikeService", () => {
  let postLikeService: PostLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostLikeService,
        { provide: IPostLikeRepository, useClass: FakePostLikeRepositroy },
      ],
    }).compile();

    postLikeService = module.get<PostLikeService>(PostLikeService);
  });

  it("should be defined", () => {
    expect(postLikeService).toBeDefined();
  });

  describe("postLike", () => {
    it("존재하지 않는 게시글일 경우 - 실패", async () => {
      const PostId = 999;
      const UserId = 999;
      await expect(
        postLikeService.postLike(PostId, UserId)
      ).rejects.toThrowError(
        new BadRequestException("존재하지 않는 게시글입니다.")
      );
    });

    it("like를 하지 않은 상황", async () => {
      const PostId = 1;
      const UserId = 999;

      const result = await postLikeService.postLike(PostId, UserId);
      expect(result).toBeNull;
    });

    it("like를 한 경우", async () => {
      const PostId = 1;
      const UserId = 1;

      const result = await postLikeService.postLike(PostId, UserId);
      expect(result).toBeNull;
    });
  });
});

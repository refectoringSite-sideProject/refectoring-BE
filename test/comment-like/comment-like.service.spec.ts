import { Test, TestingModule } from "@nestjs/testing";
import { plainToInstance } from "class-transformer";
import { ICommentLikeRepository } from "../../src/modules/comment-like/comment-like.IRepository";
import { CommentLikeOutputDto } from "../../src/modules/comment-like/dto/output/comment-like.output.dto";
import { CommentLikeService } from "../../src/modules/comment-like/comment-like.service";

const CommentLikeMockData = {
  commentLike: {
    id: 1,
    CommentId: 1,
    UserId: 1,
  },
};

export class FakeCommentLikeRepository implements ICommentLikeRepository {
  findCommentLike(CommentId: number, UserId: number): CommentLikeOutputDto {
    if (CommentId === 1 && UserId === 1) {
      return plainToInstance(
        CommentLikeOutputDto,
        CommentLikeMockData.commentLike
      );
    }
  }
  createCommentLike(CommentId: number, UserId: number): Promise<void> {
    return;
  }
  deleteCommentLike(CommentLikeId: number): Promise<void> {
    return;
  }
}

describe("CommentLikeService", () => {
  let commentLikeService: CommentLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentLikeService,
        {
          provide: ICommentLikeRepository,
          useClass: FakeCommentLikeRepository,
        },
      ],
    }).compile();

    commentLikeService = module.get<CommentLikeService>(CommentLikeService);
  });

  it("should be defined", () => {
    expect(commentLikeService).toBeDefined();
  });

  describe("commentLike", () => {
    it("좋아요 등록 - 해당 댓글에 좋아요를 하지 않았을 때", async () => {
      const CommentId = 1;
      const UserId = 2;

      const result = await commentLikeService.commentLike(CommentId, UserId);
      expect(result).toBeNull;
    });

    it("좋아요 취소 - 해당 댓글에 좋아요를 이미 했을 때", async () => {
      const CommentId = 1;
      const UserId = 1;

      const result = await commentLikeService.commentLike(CommentId, UserId);
      expect(result).toBeNull;
    });
  });
});

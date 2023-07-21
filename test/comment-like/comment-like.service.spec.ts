import { Test, TestingModule } from "@nestjs/testing";
import { plainToInstance } from "class-transformer";
import { ICommentLikeRepository } from "../../src/modules/comment-like/comment-like.IRepository";
import { CommentLikeOutputDto } from "../../src/modules/comment-like/dto/output/comment-like.output.dto";
import { CommentLikeService } from "../../src/modules/comment-like/comment-like.service";
import { CommentOutputDto } from "../../src/modules/comment-like/dto/output/comment.output.dto";
import { BadRequestException } from "@nestjs/common";

const CommentLikeMockData = {
  commentLike: {
    id: 1,
    CommentId: 1,
    UserId: 1,
  },
  comment: {
    id: 1,
    content: "content",
    UserId: 1,
    PostId: 1,
  },
};

export class FakeCommentLikeRepository implements ICommentLikeRepository {
  async findCommentLike(
    CommentId: number,
    UserId: number
  ): Promise<CommentLikeOutputDto> {
    if (CommentId === 1 && UserId === 1) {
      return plainToInstance(
        CommentLikeOutputDto,
        CommentLikeMockData.commentLike
      );
    }
    return;
  }
  async createCommentLike(CommentId: number, UserId: number): Promise<void> {
    return;
  }
  async deleteCommentLike(CommentLikeId: number): Promise<void> {
    return;
  }

  async findOneCommentByCommentId(
    CommentId: number
  ): Promise<CommentOutputDto> {
    if (CommentId === 1) {
      return plainToInstance(CommentOutputDto, CommentLikeMockData.comment);
    }
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

    it("존재하지 않는 댓글번호로 요청을 보냈을 때 - 실패", async () => {
      const CommentId = 20;
      const UserId = 1;

      await expect(
        commentLikeService.commentLike(CommentId, UserId)
      ).rejects.toThrowError(
        new BadRequestException("존재하지 않는 댓글입니다.")
      );
    });
  });
});

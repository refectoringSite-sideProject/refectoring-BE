import { Test, TestingModule } from "@nestjs/testing";
import { CreateCommentInputDto } from "src/modules/comment/dto/input/create-comment.dto";
import { ICommentRepository } from "../../src/modules/comment/comment.IRepository";
import { CommentService } from "../../src/modules/comment/comment.service";

export class FakeCommentRepository implements ICommentRepository {
  async createComment(
    PostId: number,
    body: CreateCommentInputDto,
    UserId: number
  ) {
    return;
  }
}

describe("CommentService", () => {
  let commentService: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        { provide: ICommentRepository, useClass: FakeCommentRepository },
      ],
    }).compile();

    commentService = module.get<CommentService>(CommentService);
  });

  it("should be defined", () => {
    expect(commentService).toBeDefined();
  });

  describe("createComment", () => {
    it("코멘트를 생성한다 - 생성", async () => {
      const PostId = 1;
      const UserId = 1;
      const body = { content: "댓글 남기고 갑니다." };
      const result = await commentService.createComment(PostId, body, UserId);
      expect(result).toBeNull;
    });
  });
});

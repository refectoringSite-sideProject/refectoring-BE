import { Test, TestingModule } from "@nestjs/testing";
import { CreateCommentInputDto } from "../../src/modules/comment/dto/input/create-comment.dto";
import { ICommentRepository } from "../../src/modules/comment/comment.IRepository";
import { CommentService } from "../../src/modules/comment/comment.service";
import { Comment } from "src/entities/comment.entity";
import { UpdateCommentInputDto } from "src/modules/comment/dto/input/update-comment.dto";

export class FakeCommentRepository implements ICommentRepository {
  async createComment(
    PostId: number,
    body: CreateCommentInputDto,
    UserId: number
  ) {
    return;
  }

  async findCommentsByPostId(PostId: number): Promise<Comment[]> {
    const result = [
      {
        id: 1,
        content: "댓글 1",
        UserId: 1,
        PostId: 1,
        User: null,
        Post: null,
        CommentLike: [],
        Recomment: [],
      },
      {
        id: 2,
        content: "댓글 2",
        UserId: 2,
        PostId: 1,
        User: null,
        Post: null,
        CommentLike: [],
        Recomment: [],
      },
      {
        id: 3,
        content: "댓글 3",
        UserId: 3,
        PostId: 1,
        User: null,
        Post: null,
        CommentLike: [],
        Recomment: [],
      },
    ];

    return result;
  }

  async updateComment(
    CommentId: number,
    body: UpdateCommentInputDto,
    UserId: number
  ): Promise<void> {
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

  describe("getCommentsByPostId", () => {
    it("게시글 번호로 댓글을 조회한다", async () => {
      const PostId = 1;
      const result = await commentService.getCommentsByPostId(PostId);
      expect(result).toEqual([
        {
          id: 1,
          content: "댓글 1",
          UserId: 1,
          PostId: 1,
          User: null,
          Post: null,
          CommentLike: [],
          Recomment: [],
        },
        {
          id: 2,
          content: "댓글 2",
          UserId: 2,
          PostId: 1,
          User: null,
          Post: null,
          CommentLike: [],
          Recomment: [],
        },
        {
          id: 3,
          content: "댓글 3",
          UserId: 3,
          PostId: 1,
          User: null,
          Post: null,
          CommentLike: [],
          Recomment: [],
        },
      ]);
    });
  });

  describe("updateComment", () => {
    it("댓글이 수정되어야 한다.", async () => {
      const CommentId = 1;
      const body = { content: "댓글 수정" };
      const UserId = 1;

      const result = commentService.updateComment(CommentId, body, UserId);

      expect(result).toBeNull;
    });
  });
});

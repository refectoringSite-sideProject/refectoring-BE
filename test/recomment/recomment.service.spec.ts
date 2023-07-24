import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { plainToInstance } from "class-transformer";
import { CommentOutputDto } from "../../src/modules/recomment/dto/output/commnet.output.dto";
import { CreateRecommentInputDto } from "../../src/modules/recomment/dto/input/create-recommnet.input.dto";
import { IRecommentRepository } from "../../src/modules/recomment/recomment.IRepository";
import { RecommentService } from "../../src/modules/recomment/recomment.service";
import { RecommentOutputDto } from "../../src/modules/recomment/dto/output/recomment.output.dto";

const RecommentMockData = {
  comment: {
    id: 1,
    content: "content",
    UserId: 1,
    PostId: 1,
  },

  recomments: [
    {
      id: 1,
      content: "대댓글 1",
    },
    {
      id: 2,
      content: "대댓글 2",
    },
    {
      id: 3,
      content: "대댓글 3",
    },
  ],
};

export class FakeRecommnetRepository implements IRecommentRepository {
  async createRecomment(
    CommentId: number,
    body: CreateRecommentInputDto,
    UserId: number
  ): Promise<void> {
    return;
  }

  async findOneCommentById(CommentId: number): Promise<CommentOutputDto> {
    if (CommentId === 1) {
      return plainToInstance(CommentOutputDto, RecommentMockData.comment);
    }
    return;
  }

  async getRecommentsByCommentId(
    CommentId: number
  ): Promise<RecommentOutputDto[]> {
    if (CommentId === 1) {
      return plainToInstance(RecommentOutputDto, RecommentMockData.recomments);
    }
  }
}

describe("RecommentService", () => {
  let recommetService: RecommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecommentService,
        { provide: IRecommentRepository, useClass: FakeRecommnetRepository },
      ],
    }).compile();

    recommetService = module.get<RecommentService>(RecommentService);
  });

  it("should be defined", () => {
    expect(recommetService).toBeDefined();
  });

  describe("createRecomment", () => {
    const UserId = 1;
    const body = { content: "대댓글 남기고 갑니다." };

    it("존재하지 않는 댓글번호로 요청을 보냈을 때 - 실패", async () => {
      const CommentId = 500;

      await expect(
        recommetService.createRecomment(CommentId, body, UserId)
      ).rejects.toThrowError(
        new BadRequestException("존재하지 않는 댓글입니다.")
      );
    });

    it("대댓글을 생성한다 - 성공", async () => {
      const CommentId = 1;
      const result = await recommetService.createRecomment(
        CommentId,
        body,
        UserId
      );
      expect(result).toBeNull;
    });
  });

  describe("getRecommentsByCommentId", () => {
    it("존재하지 않는 댓글번호로 요청을 보냈을 때 - 실패", async () => {
      const CommentId = 20;

      await expect(
        recommetService.getRecommentsByCommentId(CommentId)
      ).rejects.toThrowError(
        new BadRequestException("존재하지 않는 댓글입니다.")
      );
    });

    it("댓글 번호로 대댓글을 조회한다", async () => {
      const CommentId = 1;

      const result = await recommetService.getRecommentsByCommentId(CommentId);
      expect(result).toEqual(RecommentMockData.recomments);
    });
  });
});

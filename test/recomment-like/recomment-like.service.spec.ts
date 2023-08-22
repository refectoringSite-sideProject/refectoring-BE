import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { plainToInstance } from "class-transformer";
import { RecommentLikeOutputDto } from "../../src/modules/recomment-like/dto/output/recomment-like.output.dto";
import { RecommentOutputDto } from "../../src/modules/recomment-like/dto/output/recomment.output.dto";
import { IRecommentLikeRepository } from "../../src/modules/recomment-like/recomment-like.IRepository";
import { RecommentLikeService } from "../../src/modules/recomment-like/recomment-like.service";

const RecommentLikeMockData = {
  recomment: {
    id: 1,
    content: "content",
  },
  recommentLike: {
    id: 1,
    RecommentId: 1,
    UserId: 1,
  },
};

export class FakeRecommentLikeRepository implements IRecommentLikeRepository {
  async findOneRecommentByRecommentId(
    RecommentId: number
  ): Promise<RecommentOutputDto> {
    if (RecommentId === 1) {
      return plainToInstance(
        RecommentOutputDto,
        RecommentLikeMockData.recomment
      );
    }
    return;
  }

  async findRecommentLike(
    RecommentId: number,
    UserId: number
  ): Promise<RecommentLikeOutputDto> {
    if (RecommentId === 1 && UserId === 1) {
      return plainToInstance(
        RecommentLikeOutputDto,
        RecommentLikeMockData.recommentLike
      );
    }
    return;
  }

  async createRecommentLike(
    RecommentId: number,
    UserId: number
  ): Promise<void> {
    return;
  }

  async deleteRecommentLike(RecommentLikeId: number): Promise<void> {
    return;
  }
}

describe("RecommentLikeService", () => {
  let recommentLikeService: RecommentLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecommentLikeService,
        {
          provide: IRecommentLikeRepository,
          useClass: FakeRecommentLikeRepository,
        },
      ],
    }).compile();
    recommentLikeService =
      module.get<RecommentLikeService>(RecommentLikeService);
  });

  it("should be defined", () => {
    expect(recommentLikeService).toBeDefined();
  });

  describe("recommentLike", () => {
    it("존재하지 않는 대댓글번호로 요청을 보냈을 때 - 실패", async () => {
      const RecommentId = 20;
      const UserId = 1;

      await expect(
        recommentLikeService.recommentLike(RecommentId, UserId)
      ).rejects.toThrowError(
        new BadRequestException("존재하지 않는 댓글입니다.")
      );
    });

    it("좋아요 등록 - 해당 대댓글에 좋아요를 하지 않았을 때", async () => {
      const RecommentId = 1;
      const UserId = 3;

      const result = await recommentLikeService.recommentLike(
        RecommentId,
        UserId
      );
      expect(result).toBeNull;
    });

    it("좋아요 취소 - 해당 대댓글에 이미 좋아요를 했을 때", async () => {
      const RecommentId = 1;
      const UserId = 1;

      const result = await recommentLikeService.recommentLike(
        RecommentId,
        UserId
      );
      expect(result).toBeNull;
    });
  });
});

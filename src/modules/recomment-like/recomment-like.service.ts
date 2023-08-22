import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IRecommentLikeRepository } from "./recomment-like.IRepository";

@Injectable()
export class RecommentLikeService {
  constructor(
    @Inject(IRecommentLikeRepository)
    private recommentLikeRepository: IRecommentLikeRepository
  ) {}

  async recommentLike(RecommentId: number, UserId: number): Promise<void> {
    const recomment =
      await this.recommentLikeRepository.findOneRecommentByRecommentId(
        RecommentId
      );
    if (!recomment) {
      throw new BadRequestException("존재하지 않는 댓글입니다.");
    }

    const recommentLike = await this.recommentLikeRepository.findRecommentLike(
      RecommentId,
      UserId
    );

    if (!recommentLike) {
      await this.recommentLikeRepository.createRecommentLike(
        RecommentId,
        UserId
      );
    }
    if (recommentLike) {
      await this.recommentLikeRepository.deleteRecommentLike(recommentLike._id);
    }

    return;
  }
}

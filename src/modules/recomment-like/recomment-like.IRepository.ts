import { RecommentLikeOutputDto } from "./dto/output/recomment-like.output.dto";
import { RecommentOutputDto } from "./dto/output/recomment.output.dto";

export interface IRecommentLikeRepository {
  findOneRecommentByRecommentId(
    RecommentId: number
  ): Promise<RecommentOutputDto>;

  findRecommentLike(
    RecommentId: number,
    UserId: number
  ): Promise<RecommentLikeOutputDto>;

  createRecommentLike(RecommentId: number, UserId: number): Promise<void>;

  deleteRecommentLike(RecommentLikeId: number): Promise<void>;
}

export const IRecommentLikeRepository = Symbol("IRecommentLikeRepository");

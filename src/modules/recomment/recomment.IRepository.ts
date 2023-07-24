import { CreateRecommentInputDto } from "./dto/input/create-recommnet.input.dto";
import { CommentOutputDto } from "./dto/output/commnet.output.dto";
import { RecommentOutputDto } from "./dto/output/recomment.output.dto";

export interface IRecommentRepository {
  createRecomment(
    CommentId: number,
    body: CreateRecommentInputDto,
    UserId: number
  ): Promise<void>;

  findOneCommentById(CommentId: number): Promise<CommentOutputDto>;

  getRecommentsByCommentId(CommentId: number): Promise<RecommentOutputDto[]>;
}

export const IRecommentRepository = Symbol("IRecommentRepository");

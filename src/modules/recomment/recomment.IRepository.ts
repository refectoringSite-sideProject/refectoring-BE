import { CreateRecommentInputDto } from "./dto/input/create-recommnet.input.dto";
import { UpdateRecommentInputDto } from "./dto/input/update-recomment.input.dto";
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

  updateRecomment(
    RecommentId: number,
    body: UpdateRecommentInputDto,
    UserId: number
  ): Promise<void>;

  findOneRecommentById(RecommentId: number): Promise<RecommentOutputDto>;
}

export const IRecommentRepository = Symbol("IRecommentRepository");

import { CommentOutputDto } from "./dto/output/comment.output.dto";
import { CommentLikeOutputDto } from "./dto/output/comment-like.output.dto";

export interface ICommentLikeRepository {
  findCommentLike(
    CommentId: number,
    UserId: number
  ): Promise<CommentLikeOutputDto>;
  createCommentLike(CommentId: number, UserId: number): Promise<void>;
  deleteCommentLike(CommentLikeId: number): Promise<void>;
  findOneCommentByCommentId(CommentId: number): Promise<CommentOutputDto>;
}

export const ICommentLikeRepository = Symbol("ICommentLikeRepository");

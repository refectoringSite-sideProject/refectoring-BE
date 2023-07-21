import { CommentLikeOutputDto } from "./dto/output/comment-like.output.dto";

export interface ICommentLikeRepository {
  findCommentLike(CommentId: number, UserId: number): CommentLikeOutputDto;
  createCommentLike(CommentId: number, UserId: number): Promise<void>;
  deleteCommentLike(CommentLikeId: number): Promise<void>;
}

export const ICommentLikeRepository = Symbol("ICommentLikeRepository");

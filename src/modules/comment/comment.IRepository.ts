import { Comment } from "../../entities/comment.entity";
import { CreateCommentInputDto } from "./dto/input/create-comment.dto";
import { UpdateCommentInputDto } from "./dto/input/update-comment.dto";

export interface ICommentRepository {
  createComment(
    PostId: number,
    body: CreateCommentInputDto,
    UserId: number
  ): Promise<void>;

  findCommentsByPostId(PostId: number): Promise<Comment[]>;

  updateComment(
    CommentId: number,
    body: UpdateCommentInputDto,
    UserId: number
  ): Promise<void>;
}

export const ICommentRepository = Symbol("ICommentRepository");

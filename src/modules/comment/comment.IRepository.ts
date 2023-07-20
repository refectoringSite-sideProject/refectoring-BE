import { Comment } from "../../entities/comment.entity";
import { CreateCommentInputDto } from "./dto/input/create-comment.input.dto";
import { UpdateCommentInputDto } from "./dto/input/update-comment.input.dto";
import { CommentOutputDto } from "./dto/output/comment.output.dto";

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

  deleteComment(CommentId: number, UserId: number): Promise<void>;

  findOneCommentById(CommentId: number): Promise<CommentOutputDto>;
}

export const ICommentRepository = Symbol("ICommentRepository");

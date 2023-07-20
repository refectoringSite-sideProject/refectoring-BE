import { Comment } from "../../entities/comment.entity";
import { CreateCommentInputDto } from "./dto/input/create-comment.dto";

export interface ICommentRepository {
  createComment(
    PostId: number,
    body: CreateCommentInputDto,
    UserId: number
  ): Promise<void>;

  findCommentsByPostId(PostId: number): Promise<Comment[]>;
}

export const ICommentRepository = Symbol("ICommentRepository");

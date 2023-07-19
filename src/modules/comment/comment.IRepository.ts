import { CreateCommentInputDto } from "./dto/input/create-comment.dto";

export interface ICommentRepository {
  createComment(
    PostId: number,
    body: CreateCommentInputDto,
    UserId: number
  ): Promise<void>;
}

export const ICommentRepository = Symbol("ICommentRepository");

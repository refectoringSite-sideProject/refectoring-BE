import { CreateCommentInputDto } from "./dto/input/create-comment.dto";

export interface ICommentRepository {
  createComment(body: CreateCommentInputDto): Promise<void>;
}

export const ICommentRepository = Symbol("ICommentRepository");

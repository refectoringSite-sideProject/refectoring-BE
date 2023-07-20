import { Inject, Injectable } from "@nestjs/common";
import { ICommentRepository } from "./comment.IRepository";
import { CreateCommentInputDto } from "./dto/input/create-comment.dto";

@Injectable()
export class CommentService {
  constructor(
    @Inject(ICommentRepository)
    private readonly commentRepository: ICommentRepository
  ) {}

  async createComment(
    PostId: number,
    body: CreateCommentInputDto,
    UserId: number
  ) {
    await this.commentRepository.createComment(PostId, body, UserId);
    return;
  }
}

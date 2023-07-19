import { Inject, Injectable } from "@nestjs/common";
import { ICommentRepository } from "./comment.IRepository";
import { CreateCommentInputDto } from "./dto/input/create-comment.dto";

@Injectable()
export class CommentService {
  constructor(
    @Inject(ICommentRepository)
    private readonly commentRepository: ICommentRepository
  ) {}

  async createComment(body: CreateCommentInputDto) {
    await this.commentRepository.createComment(body);
    return;
  }
}

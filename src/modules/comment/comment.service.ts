import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Comment } from "src/entities/comment.entity";
import { ICommentRepository } from "./comment.IRepository";
import { CreateCommentInputDto } from "./dto/input/create-comment.input.dto";
import { UpdateCommentInputDto } from "./dto/input/update-comment.input.dto";

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
  ): Promise<void> {
    await this.commentRepository.createComment(PostId, body, UserId);
    return;
  }

  async getCommentsByPostId(PostId: number): Promise<Comment[]> {
    const result = await this.commentRepository.findCommentsByPostId(PostId);
    return result;
  }

  async updateComment(
    CommentId: number,
    body: UpdateCommentInputDto,
    UserId: number
  ): Promise<void> {
    const comment = await this.commentRepository.findOneCommentById(CommentId);
    if (!comment) {
      throw new BadRequestException("존재하지 않는 댓글입니다.");
    }
    await this.commentRepository.updateComment(CommentId, body, UserId);
    return;
  }

  async deleteComment(CommentId: number, UserId: number): Promise<void> {
    const comment = await this.commentRepository.findOneCommentById(CommentId);
    if (!comment) {
      throw new BadRequestException("존재하지 않는 댓글입니다.");
    }
    await this.commentRepository.deleteComment(CommentId, UserId);
    return;
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Comment } from "src/entities/comment.entity";
import { CommentLike } from "src/entities/commentLike.entity";
import { Repository } from "typeorm";
import { ICommentLikeRepository } from "./comment-like.IRepository";
import { CommentLikeOutputDto } from "./dto/output/comment-like.output.dto";
import { CommentOutputDto } from "./dto/output/comment.output.dto";

@Injectable()
export class CommentLikeRepository implements ICommentLikeRepository {
  constructor(
    @InjectRepository(Comment) private commentModel: Repository<Comment>,
    @InjectRepository(CommentLike)
    private commentLikeModel: Repository<CommentLike>
  ) {}

  async findCommentLike(
    CommentId: number,
    UserId: number
  ): Promise<CommentLikeOutputDto> {
    const result = await this.commentLikeModel.findOne({
      where: { CommentId, UserId },
    });

    return plainToInstance(CommentLikeOutputDto, result);
  }

  async createCommentLike(CommentId: number, UserId: number): Promise<void> {
    const newCommentLike = this.commentLikeModel.create();
    newCommentLike.CommentId = CommentId;
    newCommentLike.UserId = UserId;
    await this.commentLikeModel.save(newCommentLike);
    return;
  }

  async deleteCommentLike(CommentLikeId: number): Promise<void> {
    await this.commentLikeModel.delete({ id: CommentLikeId });
    return;
  }

  async findOneCommentByCommentId(
    CommentId: number
  ): Promise<CommentOutputDto> {
    const result = await this.commentModel.findOne({
      where: { id: CommentId },
    });

    return plainToInstance(CommentOutputDto, result);
  }
}

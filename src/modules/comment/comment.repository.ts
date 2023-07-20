import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "src/entities/comment.entity";
import { Repository } from "typeorm";
import { ICommentRepository } from "./comment.IRepository";
import { CreateCommentInputDto } from "./dto/input/create-comment.dto";

export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectRepository(Comment) private commentModel: Repository<Comment>
  ) {}

  async createComment(
    PostId: number,
    body: CreateCommentInputDto,
    UserId: number
  ): Promise<void> {
    const { content } = body;
    const newComment = await this.commentModel.create();
    newComment.PostId = PostId;
    newComment.content = content;
    newComment.UserId = UserId;
    await this.commentModel.save(newComment);
    return;
  }
}

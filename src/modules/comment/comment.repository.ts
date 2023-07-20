import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "src/entities/comment.entity";
import { Repository } from "typeorm";
import { ICommentRepository } from "./comment.IRepository";
import { CreateCommentInputDto } from "./dto/input/create-comment.dto";
import { UpdateCommentInputDto } from "./dto/input/update-comment.dto";

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

  async findCommentsByPostId(PostId: number): Promise<Comment[]> {
    const result = await this.commentModel.find({ where: { PostId } });
    return result;
  }

  async updateComment(
    CommentId: number,
    body: UpdateCommentInputDto,
    UserId: number
  ) {
    const content = body.content;
    await this.commentModel.update({ id: CommentId, UserId }, { content });
    return;
  }

  async deleteComment(CommentId: number, UserId: number): Promise<void> {
    await this.commentModel.delete({ id: CommentId, UserId });
    return;
  }
}

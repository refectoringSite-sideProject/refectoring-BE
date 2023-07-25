import { Module } from "@nestjs/common";
import { CommentLikeService } from "./comment-like.service";
import { CommentLikeController } from "./comment-like.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "src/entities/comment.entity";
import { CommentLike } from "src/entities/commentLike.entity";
import { CommentLikeRepository } from "./comment-like.repository";
import { ICommentLikeRepository } from "./comment-like.IRepository";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, CommentLike])],
  controllers: [CommentLikeController],
  providers: [
    CommentLikeService,
    { provide: ICommentLikeRepository, useClass: CommentLikeRepository },
  ],
})
export class CommentLikeModule {}

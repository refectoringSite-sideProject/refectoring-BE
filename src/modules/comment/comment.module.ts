import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { ICommentRepository } from "./comment.IRepository";
import { CommentRepository } from "./comment.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "src/entities/comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [
    CommentService,
    {
      provide: ICommentRepository,
      useClass: CommentRepository,
    },
  ],
})
export class CommentModule {}

import { Module } from "@nestjs/common";
import { PostLikeController } from "./post-like.controller";
import { PostLikeService } from "./post-like.service";
import { IPostLikeRepository } from "./post-like.IRepository";
import { PostLikeRepository } from "./post-like.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "src/entities/post.entity";
import { PostLike } from "src/entities/postLike.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostLike])],
  controllers: [PostLikeController],
  providers: [
    PostLikeService,
    { provide: IPostLikeRepository, useClass: PostLikeRepository },
  ],
})
export class PostLikeModule {}

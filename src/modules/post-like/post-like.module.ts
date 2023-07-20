import { Module } from "@nestjs/common";
import { PostLikeController } from "./post-like.controller";
import { PostLikeService } from "./post-like.service";
import { IPostLikeRepository } from "./post-like.IRepository";
import { PostLikeRepository } from "./post-like.repository";

@Module({
  controllers: [PostLikeController],
  providers: [
    PostLikeService,
    { provide: IPostLikeRepository, useClass: PostLikeRepository },
  ],
})
export class PostLikeModule {}

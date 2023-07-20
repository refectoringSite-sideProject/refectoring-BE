import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { IPostRepository } from "./post.IRepository";
import { PostRepository } from "./post.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "src/entities/post.entity";
import { Category } from "src/entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category])],
  controllers: [PostController],
  providers: [
    PostService,
    { provide: IPostRepository, useClass: PostRepository },
  ],
})
export class PostModule {}

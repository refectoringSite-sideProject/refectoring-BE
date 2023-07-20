import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../../entities/post.entity";
import { Repository } from "typeorm";
import { IPostLikeRepository } from "./post-like.IRepository";
import { PostOutputDto } from "./dto/output/post.output.dto";
import { PostLikeOutputDto } from "./dto/output/postLike.output.dto";
import { PostLike } from "../../entities/postLike.entity";

@Injectable()
export class PostLikeRepository implements IPostLikeRepository {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(PostLike) private postLikeRepository: Repository<PostLike>
  ) {}

  async findPost(PostId: number): Promise<PostOutputDto> {
    const post = await this.postRepository
      .createQueryBuilder("post")
      .where("post.id = :PostId", { PostId })
      .getRawOne();

    return post;
  }

  async findPostLike(
    PostId: number,
    UserId: number
  ): Promise<PostLikeOutputDto> {
    const postLike = await this.postLikeRepository
      .createQueryBuilder("postLike")
      .where("postLike.PostId = :PostId", { PostId })
      .andWhere("postLike.UserId = :UserId", { UserId })
      .getRawOne();

    return postLike;
  }

  async createPostLike(PostId: number, UserId: number): Promise<void> {
    const newPostLike = this.postLikeRepository.create();
    newPostLike.PostId = PostId;
    newPostLike.UserId = UserId;
    await this.postLikeRepository.save(newPostLike);
    return;
  }

  async deletePostLike(PostId: number, UserId: number): Promise<void> {
    await this.postLikeRepository.delete({ PostId, UserId });
  }
}

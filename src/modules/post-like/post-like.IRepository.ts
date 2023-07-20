import { PostOutputDto } from "./dto/output/post.output.dto";
import { PostLikeOutputDto } from "./dto/output/postLike.output.dto";

export interface IPostLikeRepository {
  findPost(PostId: number): Promise<PostOutputDto>;
  findPostLike(PostId: number, UserId: number): Promise<PostLikeOutputDto>;
  createPostLike(PostId: number, UserId: number): Promise<void>;
  deletePostLike(PostId: number, UserId: number): Promise<void>;
}

export const IPostLikeRepository = Symbol("IPostLikeRepository");

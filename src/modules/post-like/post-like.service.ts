import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IPostLikeRepository } from "./post-like.IRepository";

@Injectable()
export class PostLikeService {
  constructor(
    @Inject(IPostLikeRepository) private postLikeRepository: IPostLikeRepository
  ) {}

  async postLike(PostId: number, UserId: number): Promise<void> {
    const post = await this.postLikeRepository.findPost(PostId);
    if (!post) {
      throw new BadRequestException("존재하지 않는 게시글입니다.");
    }

    const postLike = await this.postLikeRepository.findPostLike(PostId, UserId);
    if (postLike) {
      await this.postLikeRepository.deletePostLike(PostId, UserId);
      return;
    }

    if (!postLike) {
      await this.postLikeRepository.createPostLike(PostId, UserId);
      return;
    }
  }
}

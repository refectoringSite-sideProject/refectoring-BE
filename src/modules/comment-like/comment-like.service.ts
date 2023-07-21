import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ICommentLikeRepository } from "./comment-like.IRepository";

@Injectable()
export class CommentLikeService {
  constructor(
    @Inject(ICommentLikeRepository)
    private commentLikeRepository: ICommentLikeRepository
  ) {}

  async commentLike(CommentId: number, UserId: number): Promise<void> {
    const comment = await this.commentLikeRepository.findOneCommentByCommentId(
      CommentId
    );
    if (!comment) {
      throw new BadRequestException("존재하지 않는 댓글입니다.");
    }

    const commentLike = await this.commentLikeRepository.findCommentLike(
      CommentId,
      UserId
    );

    if (!commentLike) {
      await this.commentLikeRepository.createCommentLike(CommentId, UserId);
    }
    if (commentLike) {
      await this.commentLikeRepository.deleteCommentLike(commentLike._id);
    }
  }
}

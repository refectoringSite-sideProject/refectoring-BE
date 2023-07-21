import { Controller, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "src/common/decorators/user.decorator";
import { CommentLikeService } from "./comment-like.service";

@ApiTags("CommentLike")
@Controller("comment-like")
export class CommentLikeController {
  constructor(private readonly commentLikeService: CommentLikeService) {}

  @ApiOperation({ summary: "댓글 좋아요 기능" })
  @Post("/:CommentId")
  @UseGuards(AuthGuard("jwt"))
  commentLike(@Param("CommentId") CommentId: number, @User() user) {
    return this.commentLikeService.commentLike(CommentId, user.sub);
  }
}

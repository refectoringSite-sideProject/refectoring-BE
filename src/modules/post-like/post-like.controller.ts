import { Controller, Param, Post, UseGuards } from "@nestjs/common";
import { PostLikeService } from "./post-like.service";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/common/decorators/user.decorator";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("PostLike")
@Controller("post-like")
export class PostLikeController {
  constructor(private postLikeService: PostLikeService) {}

  @ApiOperation({ summary: "포스트 좋아요 기능" })
  @Post("/:PostId")
  @UseGuards(AuthGuard("jwt"))
  async postLike(@Param("PostId") PostId: number, @User() user) {
    await this.postLikeService.postLike(PostId, user.sub);
  }
}

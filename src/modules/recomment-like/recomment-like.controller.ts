import { Controller, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "src/common/decorators/user.decorator";
import { RecommentLikeService } from "./recomment-like.service";

@ApiTags("RecommentLike")
@Controller("recomment-like")
export class RecommentLikeController {
  constructor(private readonly recommentLikeService: RecommentLikeService) {}

  @ApiOperation({ summary: "대댓글 좋아요 기능" })
  @Post("/:RecommentId")
  @UseGuards(AuthGuard("jwt"))
  async recommentLike(
    @Param("RecommentId") RecommentId: number,
    @User() user
  ): Promise<void> {
    await this.recommentLikeService.recommentLike(RecommentId, user.sub);
    return;
  }
}

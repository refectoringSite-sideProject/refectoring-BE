import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "src/common/decorators/user.decorator";
import { CommentService } from "./comment.service";
import { CreateCommentInputDto } from "./dto/input/create-comment.dto";

@ApiTags("Comment")
@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: "댓글 생성 API" })
  @Post(":postId")
  @UseGuards(AuthGuard("jwt"))
  async createComment(
    @Param("postId") PostId: number,
    @Body() body: CreateCommentInputDto,
    @User() User
  ) {
    await this.commentService.createComment(PostId, body, User.sub);
  }

  @ApiOperation({ summary: "게시글 번호로 댓글 조회 API" })
  @Get(":postId")
  async getCommentsByPostId(@Param("postId") PostId: number) {
    const result = await this.commentService.getCommentsByPostId(PostId);
    return result;
  }
}

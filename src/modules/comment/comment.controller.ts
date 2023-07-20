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
import { Comment } from "src/entities/comment.entity";
import { CommentService } from "./comment.service";
import { CreateCommentInputDto } from "./dto/input/create-comment.input.dto";
import { UpdateCommentInputDto } from "./dto/input/update-comment.input.dto";

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
  ): Promise<void> {
    await this.commentService.createComment(PostId, body, User.sub);
  }

  @ApiOperation({ summary: "게시글 번호로 댓글 조회 API" })
  @Get(":postId")
  async getCommentsByPostId(
    @Param("postId") PostId: number
  ): Promise<Comment[]> {
    const result = await this.commentService.getCommentsByPostId(PostId);
    return result;
  }

  @ApiOperation({ summary: "댓글 수정 API" })
  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  async updateComment(
    @Param("id") CommentId: number,
    @Body() body: UpdateCommentInputDto,
    @User() User
  ): Promise<void> {
    await this.commentService.updateComment(CommentId, body, User.sub);
    return;
  }

  @ApiOperation({ summary: "댓글 삭제 API" })
  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  async deleteComment(
    @Param("id") CommentId: number,
    @User() User
  ): Promise<void> {
    await this.commentService.deleteComment(CommentId, User.sub);
    return;
  }
}

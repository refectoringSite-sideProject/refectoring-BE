import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "src/common/decorators/user.decorator";
import { CreateRecommentInputDto } from "./dto/input/create-recommnet.input.dto";
import { UpdateRecommentInputDto } from "./dto/input/update-recomment.input.dto";
import { RecommentOutputDto } from "./dto/output/recomment.output.dto";
import { RecommentService } from "./recomment.service";

@ApiTags("Recomment")
@Controller("recomment")
export class RecommentController {
  constructor(private readonly recommentService: RecommentService) {}

  @ApiOperation({ summary: "대댓글 생성 API" })
  @Post("/:commentId")
  @UseGuards(AuthGuard("jwt"))
  async createRecomment(
    @Param("commentId") CommentId: number,
    @Body() body: CreateRecommentInputDto,
    @User() User
  ): Promise<void> {
    await this.recommentService.createRecomment(CommentId, body, User.sub);
    return;
  }

  @ApiOperation({ summary: "대댓글 조회 API" })
  @Get("/:commentId")
  async getRecommentsByCommentId(
    @Param("commentId") CommentId: number
  ): Promise<RecommentOutputDto[]> {
    const result = await this.recommentService.getRecommentsByCommentId(
      CommentId
    );
    return result;
  }

  @ApiOperation({ summary: "대댓글 수정 API" })
  @Patch("/:recommentId")
  @UseGuards(AuthGuard("jwt"))
  async updateRecomment(
    @Param("recommentId") RecommentId: number,
    @Body() body: UpdateRecommentInputDto,
    @User() User
  ): Promise<void> {
    await this.recommentService.updateRecomment(RecommentId, body, User.sub);
    return;
  }

  @ApiOperation({ summary: "대댓글 삭제 API" })
  @Delete("/:recommentId")
  @UseGuards(AuthGuard("jwt"))
  async deleteRecomment(
    @Param("recommentId") RecommentId: number,
    @User() User
  ) {
    await this.recommentService.deleteRecomment(RecommentId, User.sub);
  }
}

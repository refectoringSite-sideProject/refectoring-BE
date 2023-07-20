import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostInputDto } from "./dto/input/createPost.input.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/common/decorators/user.decorator";

@ApiTags("Post")
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: "게시글 생성 API" })
  @Post()
  @UseGuards(AuthGuard("jwt"))
  async createPost(
    @Body() body: CreatePostInputDto,
    @User() user
  ): Promise<void> {
    await this.postService.createPost(body, user.sub);
    return;
  }
}

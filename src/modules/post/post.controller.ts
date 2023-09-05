import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostInputDto } from "./dto/input/createPost.input.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/common/decorators/user.decorator";
import { GetPostOutputDto } from "./dto/output/getPost.output.dto";
import { GetAllPostOutputDto } from "./dto/output/getAllPost.output.dto";

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

  @ApiOperation({ summary: "메인페이지용 최신글 가져오기 API" })
  @Get("/latest")
  async getLatestPosts(): Promise<GetAllPostOutputDto[]> {
    const result = await this.postService.getLatestPosts();
    return result;
  }

  @ApiOperation({ summary: "메인페이지용 인기글 가져오기 API" })
  @Get("/best")
  async getBestPosts(): Promise<GetAllPostOutputDto[]> {
    const result = await this.postService.getBestPosts();
    return result;
  }

  @ApiOperation({ summary: "게시물 전체조회 API" })
  @Get("/:CategoryId")
  async getAllPost(@Param("CategoryId") CategoryId: number) {
    const result = await this.postService.getAllPost(CategoryId);
    return result;
  }

  @ApiOperation({ summary: "특정 게시글 조회 API" })
  @Get("/:CategoryId/:PostId")
  async getPost(
    @Param("CategoryId") CategoryId: number,
    @Param("PostId") PostId: number
  ): Promise<GetPostOutputDto> {
    const result = await this.postService.getPost(CategoryId, PostId);
    return result;
  }
}

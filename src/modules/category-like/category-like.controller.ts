import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CategoryLikeInputDto } from "./dto/input/categoryLike.input.dto";
import { CategoryLikeService } from "./category-like.service";
import { User } from "src/common/decorators/user.decorator";

@ApiTags("CategoryLike")
@Controller("categoryLike")
export class CategoryLikeController {
  constructor(private categoryLikeService: CategoryLikeService) {}

  @ApiOperation({ summary: "카테고리 좋아요 기능" })
  @UseGuards(AuthGuard("jwt"))
  @Post()
  async categorylike(@Body() body: CategoryLikeInputDto, @User() User) {
    await this.categoryLikeService.categoryLike(body, User.sub);
  }
}

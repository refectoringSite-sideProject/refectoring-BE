import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IPostRepository } from "./post.IRepository";
import { CreatePostInputDto } from "./dto/input/createPost.input.dto";
import { GetAllPostOutputDto } from "./dto/output/getAllPost.output.dto";

@Injectable()
export class PostService {
  constructor(
    @Inject(IPostRepository) private postRepository: IPostRepository
  ) {}

  async createPost(body: CreatePostInputDto, UserId: number): Promise<void> {
    const { CategoryId } = body;
    const category = await this.postRepository.isCategory(CategoryId);
    if (!category) {
      throw new BadRequestException("존재하지 않는 카테고리 입니다");
    }
    await this.postRepository.createPost(body, UserId);
    return;
  }

  async getAllPost(CategoryId: number): Promise<GetAllPostOutputDto[]> {
    const category = await this.postRepository.isCategory(CategoryId);
    if (!category) {
      throw new BadRequestException("존재하지 않는 카테고리 입니다");
    }
    const posts = await this.postRepository.getAllPostByCategoryId(CategoryId);
    return posts;
  }
}

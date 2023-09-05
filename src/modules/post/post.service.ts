import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IPostRepository } from "./post.IRepository";
import { CreatePostInputDto } from "./dto/input/createPost.input.dto";
import { GetAllPostOutputDto } from "./dto/output/getAllPost.output.dto";
import { GetPostOutputDto } from "./dto/output/getPost.output.dto";

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

  async getPost(CategoryId: number, PostId: number): Promise<GetPostOutputDto> {
    const post = await this.postRepository.getPostByPostId(CategoryId, PostId);
    return post;
  }

  async getLatestPosts(): Promise<GetAllPostOutputDto[]> {
    const posts = await this.postRepository.getLatestPosts();
    return posts;
  }

  async getBestPosts(): Promise<GetAllPostOutputDto[]> {
    const posts = await this.postRepository.getBestPosts();
    return posts;
  }
}

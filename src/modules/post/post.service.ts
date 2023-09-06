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

  async getPostPagenation(limit: number, offset: number, categoryId: number) {
    const BASE_URL = process.env.BASE_URL;
    const posts = await this.postRepository.getPostPagenation(
      limit,
      offset,
      categoryId
    );

    const postsCount = await this.postRepository.postsCount(categoryId);

    posts.map((post) => {
      if (post.tag) post.tag = post.tag.split(",");
    });

    posts.map((post) => {
      post.PostLike = post.PostLike.length;
      post.Comment = post.Comment.length;

      post["postLike"] = post["PostLike"];
      post["comment"] = post["Comment"];
      delete post["PostLike"];
      delete post["Comment"];
    });

    let next: string;
    let nextValue = offset + limit;
    next = `${BASE_URL}?categoryId=${categoryId}&limit=${limit}&offset=${nextValue}`;

    let previous: string;
    let previousValue = offset - limit;
    if (offset - limit > 0) {
      previous = `${BASE_URL}?categoryId=${categoryId}&limit=${limit}&offset=${previousValue}`;
    } else {
      previous = null;
    }

    return { posts, next, previous, count: postsCount };
  }

  async getPost(CategoryId: number, PostId: number): Promise<GetPostOutputDto> {
    const post = await this.postRepository.getPostByPostId(CategoryId, PostId);
    return post;
  }

  async getLatestPosts(numberOfPosts: number): Promise<GetAllPostOutputDto[]> {
    const posts = await this.postRepository.getLatestPosts(numberOfPosts);
    posts.map((post) => {
      if (typeof post.post_tag === "string") {
        post.post_tag = post.post_tag.split(",");
      }
    });

    return posts;
  }

  async getBestPosts(numberOfPosts: number): Promise<GetAllPostOutputDto[]> {
    const posts = await this.postRepository.getBestPosts(numberOfPosts);
    posts.map((post) => {
      if (typeof post.post_tag === "string") {
        post.post_tag = post.post_tag.split(",");
      }
    });
    return posts;
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/entities/post.entity";
import { Repository } from "typeorm";
import { IPostRepository } from "./post.IRepository";
import { CreatePostInputDto } from "./dto/input/createPost.input.dto";
import { Category } from "src/entities/category.entity";
import { IsCategoryOutputDto } from "./dto/output/isCategory.output.dto";
import { plainToInstance } from "class-transformer";
import { Comment } from "src/entities/comment.entity";
import { GetAllPostOutputDto } from "./dto/output/getAllPost.output.dto";
import { GetPostOutputDto } from "./dto/output/getPost.output.dto";

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async isCategory(CategoryId: number): Promise<IsCategoryOutputDto> {
    const category = await this.categoryRepository.findOne({
      where: { id: CategoryId },
    });
    return plainToInstance(IsCategoryOutputDto, category);
  }

  async createPost(body: CreatePostInputDto, UserId: number): Promise<void> {
    const { title, content, CategoryId } = body;

    const newPost = this.postRepository.create();
    newPost.title = title;
    newPost.content = content;
    newPost.content = content;
    newPost.CategoryId = CategoryId;
    newPost.UserId = UserId;
    await this.postRepository.save(newPost);
    return;
  }

  async getAllPostByCategoryId(
    CategoryId: number
  ): Promise<GetAllPostOutputDto[]> {
    const result = await this.postRepository
      .createQueryBuilder("post")
      .where("post.CategoryId = :CategoryId", { CategoryId })
      .leftJoin("post.Comment", "comment")
      .leftJoin("post.PostLike", "postLike")
      .select([
        "post.id",
        "post.title",
        "post.content",
        "post.createdAt",
        "post.UserId",
        "post.CategoryId",
        "COUNT(comment.id) as commentCount",
        "COUNT(postLike.id) as likeCount",
      ])
      .groupBy("post.id")
      .getRawMany();

    return result;
  }

  async getPostByPostId(
    CategoryId: number,
    PostId: number
  ): Promise<GetPostOutputDto> {
    const post = await this.postRepository
      .createQueryBuilder("post")
      .where("post.CategoryId = :CategoryId", { CategoryId })
      .andWhere("post.id = :PostId", { PostId })
      .leftJoin("post.User", "user")
      .leftJoin("post.PostLike", "postLike")
      .select([
        "post.id",
        "post.title",
        "post.content",
        "post.createdAt",
        "post.UserId",
        "post.CategoryId",
        "user.id",
        "user.email",
        "user.nickname",
        "user.point",
        "user.TierId",
        "COUNT(postLike.id) as likeCount",
      ])
      .groupBy("postid")
      .getRawOne();

    return post;
  }

  async getLatestPosts(): Promise<GetAllPostOutputDto[]> {
    const result = await this.postRepository
      .createQueryBuilder("post")
      .leftJoin("post.Comment", "comment")
      .leftJoin("post.PostLike", "postLike")
      .select([
        "post.id",
        "post.title",
        "post.content",
        "post.tag",
        "post.createdAt",
        "post.UserId",
        "post.CategoryId",
        "COUNT(comment.id) as commentCount",
        "COUNT(postLike.id) as likeCount",
      ])
      .groupBy("post.id")
      .orderBy("post.createdAt", "DESC")
      .limit(5)
      .getRawMany();

    return result;
  }

  async getBestPosts(): Promise<GetAllPostOutputDto[]> {
    const result = await this.postRepository
      .createQueryBuilder("post")
      .leftJoin("post.Comment", "comment")
      .leftJoin("post.PostLike", "postLike")
      .select([
        "post.id",
        "post.title",
        "post.content",
        "post.UserId",
        "post.CategoryId",
        "COUNT(comment.id) as commentCount",
        "COUNT(postLike.id) as likeCount",
      ])
      .groupBy("post.id")
      .orderBy("likeCount", "DESC")
      .limit(5)
      .getRawMany();

    return result;
  }
}

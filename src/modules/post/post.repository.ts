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
    private readonly categoryRepository: Repository<Category>
  ) {}

  async isCategory(CategoryId: number): Promise<IsCategoryOutputDto> {
    const category = await this.categoryRepository.findOne({
      where: { id: CategoryId },
    });
    return plainToInstance(IsCategoryOutputDto, category);
  }

  async createPost(body: CreatePostInputDto, UserId: number): Promise<void> {
    const { title, content, tag, CategoryId } = body;

    const newPost = this.postRepository.create();
    newPost.title = title;
    newPost.content = content;
    newPost.tag = tag.toString();
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
        "post.tag",
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

  async getPostPagenation(limit: number, offset: number, categoryId: number) {
    const result = await this.postRepository
      .createQueryBuilder("post")
      .where("post.CategoryId = :categoryId", { categoryId })
      .leftJoin("post.User", "users")
      .leftJoin("post.Category", "categories")
      .leftJoin("post.PostLike", "postLikes")
      .leftJoin("post.Comment", "comments")
      .select([
        "post.id",
        "post.title",
        "post.tag",
        "post.createdAt",
        "categories.id",
        "categories.category",
        "users.id",
        "users.point",
        "users.nickname",
        "users.profileImg",
        "users.TierId",
        "postLikes.id",
        "comments.id",
      ])
      .offset(offset)
      .limit(limit)
      .getMany();

    return result;
  }

  async postsCount(categoryId: number) {
    const result = await this.postRepository
      .createQueryBuilder("post")
      .where("post.CategoryId = :categoryId", { categoryId })
      .getCount();

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
        "post.tag",
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

  async getLatestPosts(numberOfPosts: number): Promise<GetAllPostOutputDto[]> {
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
      .limit(numberOfPosts)
      .getRawMany();

    return result;
  }

  async getBestPosts(numberOfPosts: number): Promise<GetAllPostOutputDto[]> {
    const result = await this.postRepository
      .createQueryBuilder("post")
      .leftJoin("post.Comment", "comment")
      .leftJoin("post.PostLike", "postLike")
      .select([
        "post.id",
        "post.title",
        "post.content",
        "post.tag",
        "post.UserId",
        "post.CategoryId",
        "COUNT(comment.id) as commentCount",
        "COUNT(postLike.id) as likeCount",
      ])
      .groupBy("post.id")
      .orderBy({
        likeCount: "DESC",
        "post.createdAt": "DESC",
      })
      .limit(numberOfPosts)
      .getRawMany();

    return result;
  }
}

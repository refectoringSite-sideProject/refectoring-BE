import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/entities/post.entity";
import { Repository } from "typeorm";
import { IPostRepository } from "./post.IRepository";
import { CreatePostInputDto } from "./dto/input/createPost.input.dto";
import { Category } from "src/entities/category.entity";
import { IsCategoryOutputDto } from "./dto/output/isCategory.output.dto";
import { plainToInstance } from "class-transformer";

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
    const { title, content, CategoryId } = body;

    const newPost = this.postRepository.create();
    newPost.title = title;
    newPost.content = content;
    newPost.CategoryId = CategoryId;
    newPost.UserId = UserId;
    await this.postRepository.save(newPost);
    return;
  }
}

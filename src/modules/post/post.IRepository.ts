import { CreatePostInputDto } from "./dto/input/createPost.input.dto";
import { IsCategoryOutputDto } from "./dto/output/isCategory.output.dto";

export interface IPostRepository {
  createPost(body: CreatePostInputDto, UserId: number): Promise<void>;
  isCategory(CategoryId: number): Promise<IsCategoryOutputDto>;
}

export const IPostRepository = Symbol("IPostRepository");

import { CreatePostInputDto } from "./dto/input/createPost.input.dto";
import { GetAllPostOutputDto } from "./dto/output/getAllPost.output.dto";
import { IsCategoryOutputDto } from "./dto/output/isCategory.output.dto";

export interface IPostRepository {
  createPost(body: CreatePostInputDto, UserId: number): Promise<void>;
  isCategory(CategoryId: number): Promise<IsCategoryOutputDto>;
  getAllPostByCategoryId(CategoryId: number): Promise<GetAllPostOutputDto[]>;
}

export const IPostRepository = Symbol("IPostRepository");

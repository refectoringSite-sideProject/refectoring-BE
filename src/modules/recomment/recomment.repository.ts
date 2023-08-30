import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Comment } from "src/entities/comment.entity";
import { Recomment } from "src/entities/recomment.entity";
import { Repository } from "typeorm";
import { CreateRecommentInputDto } from "./dto/input/create-recommnet.input.dto";
import { UpdateRecommentInputDto } from "./dto/input/update-recomment.input.dto";
import { CommentOutputDto } from "./dto/output/commnet.output.dto";
import { RecommentOutputDto } from "./dto/output/recomment.output.dto";
import { IRecommentRepository } from "./recomment.IRepository";

export class RecommentRepository implements IRecommentRepository {
  constructor(
    @InjectRepository(Comment) private commentModel: Repository<Comment>,
    @InjectRepository(Recomment) private recommentModel: Repository<Recomment>
  ) {}

  async createRecomment(
    CommentId: number,
    body: CreateRecommentInputDto,
    UserId: number
  ): Promise<void> {
    const { content } = body;
    const newRecomment = await this.recommentModel.create();
    newRecomment.CommentId = CommentId;
    newRecomment.content = content;
    newRecomment.UserId = UserId;

    await this.recommentModel.save(newRecomment);
    return;
  }

  async findOneCommentById(CommentId: number): Promise<CommentOutputDto> {
    const result = await this.commentModel.findOne({
      where: { id: CommentId },
    });
    return plainToInstance(CommentOutputDto, result);
  }

  async getRecommentsByCommentId(
    CommentId: number
  ): Promise<RecommentOutputDto[]> {
    const result = await this.recommentModel.find({ where: { CommentId } });
    return plainToInstance(RecommentOutputDto, result);
  }

  async updateRecomment(
    RecommentId: number,
    body: UpdateRecommentInputDto,
    UserId: number
  ): Promise<void> {
    const { content } = body;
    await this.recommentModel.update({ id: RecommentId, UserId }, { content });
    return;
  }

  async findOneRecommentById(RecommentId: number): Promise<RecommentOutputDto> {
    const result = await this.recommentModel.findOne({
      where: { id: RecommentId },
    });
    return plainToInstance(RecommentOutputDto, result);
  }

  async deleteRecomment(RecommentId: number, UserId: number): Promise<void> {
    await this.recommentModel.delete({ id: RecommentId, UserId });
    return;
  }
}

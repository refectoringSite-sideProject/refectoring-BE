import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Recomment } from "src/entities/recomment.entity";
import { RecommentLike } from "src/entities/recommentLike.entity";
import { Repository } from "typeorm";
import { RecommentLikeOutputDto } from "./dto/output/recomment-like.output.dto";
import { RecommentOutputDto } from "./dto/output/recomment.output.dto";
import { IRecommentLikeRepository } from "./recomment-like.IRepository";

@Injectable()
export class RecommentLikeRepository implements IRecommentLikeRepository {
  constructor(
    @InjectRepository(Recomment) private recommentModel: Repository<Recomment>,
    @InjectRepository(RecommentLike)
    private recommentLikeModel: Repository<RecommentLike>
  ) {}

  async findOneRecommentByRecommentId(
    RecommentId: number
  ): Promise<RecommentOutputDto> {
    const result = await this.recommentModel.findOne({
      where: { id: RecommentId },
    });

    return plainToInstance(RecommentOutputDto, result);
  }

  async findRecommentLike(
    RecommentId: number,
    UserId: number
  ): Promise<RecommentLikeOutputDto> {
    const result = await this.recommentLikeModel.findOne({
      where: { RecommentId, UserId },
    });

    return plainToInstance(RecommentLikeOutputDto, result);
  }

  async createRecommentLike(
    RecommentId: number,
    UserId: number
  ): Promise<void> {
    const newRecommentLike = this.recommentLikeModel.create();
    newRecommentLike.RecommentId = RecommentId;
    newRecommentLike.UserId = UserId;
    await this.recommentLikeModel.save(newRecommentLike);
    return;
  }

  async deleteRecommentLike(RecommentLikeId: number): Promise<void> {
    await this.recommentLikeModel.delete({ id: RecommentLikeId });
    return;
  }
}

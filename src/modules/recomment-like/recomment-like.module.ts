import { Module } from "@nestjs/common";
import { RecommentLikeService } from "./recomment-like.service";
import { RecommentLikeController } from "./recomment-like.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Recomment } from "src/entities/recomment.entity";
import { RecommentLike } from "src/entities/recommentLike.entity";
import { IRecommentLikeRepository } from "./recomment-like.IRepository";
import { RecommentLikeRepository } from "./recomment-like.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Recomment, RecommentLike])],
  controllers: [RecommentLikeController],
  providers: [
    RecommentLikeService,
    { provide: IRecommentLikeRepository, useClass: RecommentLikeRepository },
  ],
})
export class RecommentLikeModule {}

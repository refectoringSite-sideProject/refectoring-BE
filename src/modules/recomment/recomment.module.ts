import { Module } from "@nestjs/common";
import { RecommentService } from "./recomment.service";
import { RecommentController } from "./recomment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Recomment } from "src/entities/recomment.entity";
import { IRecommentRepository } from "./recomment.IRepository";
import { RecommentRepository } from "./recomment.repository";
import { Comment } from "src/entities/comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Recomment])],
  controllers: [RecommentController],
  providers: [
    RecommentService,
    {
      provide: IRecommentRepository,
      useClass: RecommentRepository,
    },
  ],
})
export class RecommentModule {}

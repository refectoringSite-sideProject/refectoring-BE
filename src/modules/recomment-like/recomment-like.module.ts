import { Module } from '@nestjs/common';
import { RecommentLikeService } from './recomment-like.service';
import { RecommentLikeController } from './recomment-like.controller';

@Module({
  controllers: [RecommentLikeController],
  providers: [RecommentLikeService]
})
export class RecommentLikeModule {}

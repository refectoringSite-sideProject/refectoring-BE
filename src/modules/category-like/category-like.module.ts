import { Module } from '@nestjs/common';
import { CategoryLikeController } from './category-like.controller';
import { CategoryLikeService } from './category-like.service';
import { CategoryLikeRepository } from './category-like.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryLike } from 'src/entities/categoryLike.entity';
import { ICategoryLikeRepository } from './category-like.IRepository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryLike])],
  controllers: [CategoryLikeController],
  providers: [
    CategoryLikeService,
    { provide: ICategoryLikeRepository, useClass: CategoryLikeRepository },
  ],
})
export class CategoryLikeModule {}

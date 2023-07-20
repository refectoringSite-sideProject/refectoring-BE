import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./common/middleware/Logger.middleware";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { CategoryLike } from "./entities/categoryLike.entity";
import { CommentLike } from "./entities/commentLike.entity";
import { PostLike } from "./entities/postLike.entity";
import { Recomment } from "./entities/recomment.entity";
import { RecommentLike } from "./entities/recommentLike.entity";
import { Tier } from "./entities/tier.entity";
import { User } from "./entities/user.entity";
import { Post } from "./entities/post.entity";
import { Comment } from "./entities/comment.entity";
import { CategoryModule } from "./modules/category/category.module";
import { CategoryLikeModule } from "./modules/category-like/category-like.module";
import { PostModule } from "./modules/post/post.module";
import { CommentModule } from "./modules/comment/comment.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: "mysql",
          host: "localhost",
          port: 3306,
          username: configService.get("DB_USERNAME"),
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_DATABASE"),
          entities: [
            Category,
            CategoryLike,
            Comment,
            CommentLike,
            Post,
            PostLike,
            Recomment,
            RecommentLike,
            Tier,
            User,
          ],
          autoLoadEntities: true,
          charset: "utf8mb4",
          synchronize: false,
          logging: true, // query 날리는것 로깅
          // keepConnectionAlive: true, //hot reloading 할때 필요
        };
      },
    }),
    AuthModule,
    CategoryModule,
    CategoryLikeModule,
    PostModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude({ path: '/', method: RequestMethod.GET })
      .forRoutes("*");
  }
}

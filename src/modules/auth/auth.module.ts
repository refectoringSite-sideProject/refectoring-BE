import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { IAuthRepository } from "./auth.IRepository";
import { AuthRepository } from "./auth.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { JwtKakaoStrategy } from "./jwt/jwt.kakao.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    JwtService,
    AuthService,
    JwtStrategy,
    JwtKakaoStrategy,
    { provide: IAuthRepository, useClass: AuthRepository },
  ],
})
export class AuthModule {}

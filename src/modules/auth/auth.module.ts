import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { IAuthRepository } from "./auth.IRepository";
import { AuthRepository } from "./auth.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { HttpService } from "../http/http.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    JwtService,
    AuthService,
    JwtStrategy,
    { provide: IAuthRepository, useClass: AuthRepository },
    HttpService,
  ],
})
export class AuthModule {}

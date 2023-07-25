import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { IAuthRepository } from "../../src/modules/auth/auth.IRepository";
import * as bcrypt from "bcrypt";
import { SignUpInputDto } from "../../src/modules/auth/dto/input/sign-up.input.dto";
import { AuthService } from "../../src/modules/auth/auth.service";
import { UserOutputDto } from "../../src/modules/auth/dto/output/user.output.dto";
import { plainToInstance } from "class-transformer";
import { ConfigModule } from "@nestjs/config";

export class FakeAuthRepository implements IAuthRepository {
  async create(signUpInputDto: SignUpInputDto): Promise<void> {
    return;
  }
  async findUserByEmail(email: string): Promise<UserOutputDto> {
    const password = "asdf1234!";
    const hashedPassword = await bcrypt.hash(password, 10);
    if (email === "honggd@gmail.com") {
      const result = {
        id: 1,
        email: "honggd@gmail.com",
        password: hashedPassword,
      };
      return plainToInstance(UserOutputDto, result);
    }
    return;
  }
}

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        AuthService,
        JwtService,
        {
          provide: IAuthRepository,
          useClass: FakeAuthRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("회원가입: id가 이미 존재하는 경우 - 실패", async () => {
    const body = {
      email: "honggd@gmail.com",
      password: "asdf1234!",
      nickname: "실패",
    };
    await expect(service.signUp(body)).rejects.toThrowError(
      new BadRequestException("이미 존재하는 id입니다")
    );
  });

  it("회원가입이 성공했을 경우", async () => {
    const body = {
      email: "test@gmail.com",
      password: "asdf1234!",
      nickname: "테스트",
    };
    const result = await service.signUp(body);
    expect(result).toBeNull;
  });

  it("로그인: 존재하지 않는 id일 경우 - 실패", async () => {
    const body = { email: "test@gmail.com", password: "asdf1234!" };
    await expect(service.signIn(body)).rejects.toThrowError(
      new UnauthorizedException("아이디 혹은 비밀번호가 올바르지 않습니다.")
    );
  });

  it("로그인: 비밀번호가 틀렸을 경우 - 실패", async () => {
    const body = { email: "honggd@gmail.com", password: "asdf1234@" };
    await expect(service.signIn(body)).rejects.toThrowError(
      new UnauthorizedException("아이디 혹은 비밀번호가 올바르지 않습니다.")
    );
  });

  it("로그인이 성공했을 경우", async () => {
    const body = { email: "honggd@gmail.com", password: "asdf1234!" };

    const result = await service.signIn(body);
    expect(result).toHaveProperty("accessToken");
  });

  it("토큰 발급에 성공한다", async () => {
    const payload = { email: "honggd@gmail.com", sub: 1 };
    const result = await service.generateJwt(payload, "access");
    expect(typeof result).toEqual("string");
  });
});

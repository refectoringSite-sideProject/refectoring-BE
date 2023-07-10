import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { IAuthRepository } from 'src/modules/auth/auth.IRepository';
import { SignUpInputDto } from 'src/modules/auth/dto/input/sign-up.input.dto';
import { AuthService } from '../../src/modules/auth/auth.service';

export class FakeAuthRepository implements IAuthRepository {
  async create(signUpInputDto: SignUpInputDto): Promise<void> {
    return;
  }
  async findUserByEmail(signUpInputDto: SignUpInputDto) {
    const email = signUpInputDto.email;
    if (email === 'honggd@gmail.com') {
      return { id: 1, email: 'honggd@gmail.com', password: '1234' };
    }
    return;
  }
  async findUserByIdWithoutPassword(userId: number) {
    const result = { id: 1, userId: 'aaa' };
    return result;
  }
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

  it('회원가입: id가 이미 존재하는 경우 - 실패', async () => {
    const body = { email: 'aaa@gmail.com', password: '1234', nickname: '실패' };
    await expect(service.signUp(body)).rejects.toThrowError(
      new BadRequestException('이미 존재하는 id입니다'),
    );
  });

  it('회원가입이 성공했을 경우', async () => {
    const body = {
      email: 'honggd@gmail.com',
      password: '1234',
      nickname: '길똥이',
    };
    const result = await service.signUp(body);
    expect(result).toBeNull;
  });

  it('로그인: 존재하지 않는 id일 경우 - 실패', async () => {
    const body = { userId: 'abcd', pasword: '1234' };
    await expect(service.signIn(body)).rejects.toThrowError(
      new UnauthorizedException('아이디 혹은 비밀번호가 올바르지 않습니다.'),
    );
  });

  it('로그인: 비밀번호가 틀렸을 경우 - 실패', async () => {
    const body = { userId: 'aaa', pasword: '12345' };
    await expect(service.signIn(body)).rejects.toThrowError(
      new UnauthorizedException('아이디 혹은 비밀번호가 올바르지 않습니다.'),
    );
  });

  it('로그인이 성공했을 경우', async () => {
    const body = { userId: 'aaa', password: '1234' };

    const result = await service.signIn(body);
    expect(result).toHaveProperty('accessToken');
  });

  it('토큰 발급에 성공한다', async () => {
    const payload = { userId: 'aaa', sub: 1 };
    const result = await service.generateJwt(payload, 'access');
    expect(result).toHaveProperty('accessToken');
  });
});

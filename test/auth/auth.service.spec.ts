/* eslint-disable prettier/prettier */
import { BadRequestException } from '@nestjs/common';
import { ApiBasicAuth } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { AuthService } from '../../src/auth/auth.service';

export class FakeAuthRepository {
  async create(createAuthDto: CreateAuthDto): Promise<void> {
    return;
  }
  async findUserById(userId: string) {
    if (userId === 'aaa') {
      return { id: 1, userId: 'aaa', password: '1234' };
    }
    return;
  }
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('회원가입: id가 이미 존재하는 경우 - 실패', async () => {
    const body = { userId: 'aaa', password: '1234' };
    await expect(service.signUp(body)).rejects.toThrowError(
      new BadRequestException('이미 존재하는 id입니다'),
    );
  });

  it('회원가입이 성공했을 경우', async () => {
    const body = { userId: 'abcd', password: '1234' };
    const result = await service.signUp(body);
    expect(result).toBeNull;
  });
});

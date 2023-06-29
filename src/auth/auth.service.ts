/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { FakeAuthRepository } from '../../test/auth/auth.service.spec';

@Injectable()
export class AuthService {
  authRepository = new FakeAuthRepository();

  async signUp(body) {
    const { userId, password } = body;
    const user = await this.authRepository.findUserById(userId);
    if (user) {
      throw new BadRequestException('이미 존재하는 id입니다');
    }

    await this.authRepository.create(body);
  }
}

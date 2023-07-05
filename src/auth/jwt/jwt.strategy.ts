/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FakeAuthRepository } from 'test/auth/auth.service.spec';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authRepository: FakeAuthRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
      ignoreExpiration: false,
    });
  }

  // async validate(payload: Payload) {
  //   const user = await this.authRepository.findUserByIdWithoutPassword(
  //     payload.sub,
  //   );
  //   if (user) {
  //     return user;
  //   } else {
  //     throw new UnauthorizedException();
  //   }
  // }
}

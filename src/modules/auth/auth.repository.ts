import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { IAuthRepository } from './auth.IRepository';
import { SignUpInputDto } from './dto/input/sign-up.input.dto';

export class AuthRepository implements IAuthRepository {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async create(signUpInputDto: SignUpInputDto): Promise<void> {
    const newUser = this.userModel.create();
    newUser.email = signUpInputDto.email;
    newUser.password = signUpInputDto.password;
    newUser.nickname = signUpInputDto.nickname;
    newUser.point = 0;
    newUser.TierId = 1;
    await this.userModel.save(newUser);
  }

  async findUserByEmail(signUpInputDto: SignUpInputDto) {
    const email = signUpInputDto.email;
    return await this.userModel.findOne({ where: { email } });
  }

  findUserByIdWithoutPassword(userId: number) {
    throw new Error('Method not implemented.');
  }
}

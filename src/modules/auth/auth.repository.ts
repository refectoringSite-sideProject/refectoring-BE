import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { IAuthRepository } from './auth.IRepository';
import { SignUpInputDto } from './dto/input/sign-up.input.dto';
import { UserOutputDto } from './dto/output/user.output.dto';

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

  async findUserByEmail(email: string): Promise<UserOutputDto> {
    const result = await this.userModel.findOne({ where: { email } });
    return plainToInstance(UserOutputDto, result);
  }

  async findUserByIdWithoutPassword(userId: number): Promise<UserOutputDto> {
    const result = await this.userModel
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.nickName',
        'user.point',
        'user.TierId',
      ])
      .where('user.id = :id', { id: userId })
      .getOne();
    return plainToInstance(UserOutputDto, result);
  }
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('Tier')
export class Tier {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'tierName' })
  tierName: string;

  @OneToMany(() => User, (User) => User.Tier)
  User: User[];
}

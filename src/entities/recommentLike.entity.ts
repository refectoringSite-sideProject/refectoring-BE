import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Recomment } from './recomment.entity';

@Entity('RecommentLike')
export class RecommentLike {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'UserId' })
  UserId: number;

  @Column('int', { name: 'RecommentId' })
  RecommentId: number;

  @ManyToOne(() => User, (User) => User.RecommentLike, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: User;

  @ManyToOne(() => Recomment, (Recomment) => Recomment.RecommentLike, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'RecommentId', referencedColumnName: 'id' }])
  Recomment: Recomment;
}

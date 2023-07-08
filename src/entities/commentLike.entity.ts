import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity('CommentLike')
export class CommentLike {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'CommentId' })
  CommentId: number;

  @Column('int', { name: 'UserId' })
  UserId: number;

  @ManyToOne(() => Comment, (Comment) => Comment.CommentLike, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'CommentId', referencedColumnName: 'id' }])
  Comment: Comment;

  @ManyToOne(() => User, (User) => User.CommentLike, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: User;
}

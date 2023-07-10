/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tier } from './tier.entity';
import { Comment } from './comment.entity';
import { CategoryLike } from './categoryLike.entity';
import { CommentLike } from './commentLike.entity';
import { Post } from './post.entity';
import { PostLike } from './postLike.entity';
import { Recomment } from './recomment.entity';
import { RecommentLike } from './recommentLike.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('varchar', { name: 'password' })
  password: string;

  @Column('int', { name: 'point' })
  point: number;

  @Column('varchar', { name: 'nickname' })
  nickname: string;

  @Column('int', { name: 'TierId' })
  TierId: number;

  @ManyToOne(() => Tier, (Tier) => Tier.User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'TierId', referencedColumnName: 'id' }])
  Tier: Tier;

  @OneToMany(() => Comment, (Comment) => Comment.User)
  Comment: Comment[];

  @OneToMany(() => CategoryLike, (CategoryLike) => CategoryLike.User)
  CategoryLike: CategoryLike[];

  @OneToMany(() => CommentLike, (CommentLike) => CommentLike.User)
  CommentLike: CommentLike[];

  @OneToMany(() => Post, (Post) => Post.User)
  Post: Post[];

  @OneToMany(() => PostLike, (PostLike) => PostLike.User)
  PostLike: PostLike[];

  @OneToMany(() => Recomment, (Recomment) => Recomment.User)
  Recomment: Recomment[];

  @OneToMany(() => RecommentLike, (RecommentLike) => RecommentLike.User)
  RecommentLike: RecommentLike[];
}

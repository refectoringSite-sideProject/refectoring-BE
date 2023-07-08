import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryLike } from './categoryLike.entity';
import { Post } from './post.entity';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'category' })
  category: string;

  @OneToMany(() => CategoryLike, (CategoryLike) => CategoryLike.Category)
  CategoryLike: CategoryLike[];

  @OneToMany(() => Post, (Post) => Post.Category)
  Post: Post[];
}

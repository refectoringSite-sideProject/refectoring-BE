import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { Comment } from "./comment.entity";
import { PostLike } from "./postLike.entity";

@Entity("Post")
export class Post {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title" })
  title: string;

  @Column("varchar", { name: "content" })
  content: string;

  @Column("int", { name: "UserId" })
  UserId: number;

  @Column("int", { name: "CategoryId" })
  CategoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (User) => User.Post, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  User: User;

  @ManyToOne(() => Category, (Category) => Category.Post, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "CategoryId", referencedColumnName: "id" }])
  Category: Category;

  @OneToMany(() => Comment, (Comment) => Comment.Post)
  Comment: Comment[];

  @OneToMany(() => PostLike, (PostLike) => PostLike.Post)
  PostLike: PostLike[];
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Post } from "./post.entity";
import { CommentLike } from "./commentLike.entity";
import { Recomment } from "./recomment.entity";

@Entity("Comment")
export class Comment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "content" })
  content: string;

  @Column("int", { name: "UserId" })
  UserId: number;

  @Column("int", { name: "PostId" })
  PostId: number;

  @ManyToOne(() => User, (User) => User.Comment, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  User: User;

  @ManyToOne(() => Post, (Post) => Post.Comment, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "PostId", referencedColumnName: "id" }])
  Post: Post;

  @OneToMany(() => CommentLike, (CommentLike) => CommentLike.Comment)
  CommentLike: CommentLike[];

  @OneToMany(() => Recomment, (Recomment) => Recomment.Comment)
  Recomment: Recomment[];
}

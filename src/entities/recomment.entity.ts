import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";
import { RecommentLike } from "./recommentLike.entity";

@Entity("Recomment")
export class Recomment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "content" })
  content: string;

  @Column("int", { name: "CommentId" })
  CommentId: string;

  @Column("int", { name: "UserId" })
  UserId: string;

  @ManyToOne(() => Comment, (Comment) => Comment.Recomment, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "CommentId", referencedColumnName: "id" }])
  Comment: Comment;

  @ManyToOne(() => User, (User) => User.Recomment, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  User: User;

  @OneToMany(() => RecommentLike, (RecommentLike) => RecommentLike.Recomment)
  RecommentLike: RecommentLike[];
}

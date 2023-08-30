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
  CommentId: number;

  @Column("int", { name: "UserId" })
  UserId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

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

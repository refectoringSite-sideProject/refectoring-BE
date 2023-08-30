import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
<<<<<<< HEAD
  UpdateDateColumn,
=======
>>>>>>> c28c7a826c1220c7c1cdc06b3f03665771d3569e
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
<<<<<<< HEAD
  CommentId: string;

  @Column("int", { name: "UserId" })
  UserId: string;
=======
  CommentId: number;

  @Column("int", { name: "UserId" })
  UserId: number;
>>>>>>> c28c7a826c1220c7c1cdc06b3f03665771d3569e

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

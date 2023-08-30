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
import { Tier } from "./tier.entity";
import { Comment } from "./comment.entity";
import { CategoryLike } from "./categoryLike.entity";
import { CommentLike } from "./commentLike.entity";
import { Post } from "./post.entity";
import { PostLike } from "./postLike.entity";
import { Recomment } from "./recomment.entity";
import { RecommentLike } from "./recommentLike.entity";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

<<<<<<< HEAD
  @Column("varchar", { name: "email" })
  email: string;

  @Column("varchar", { name: "password" })
  password: string;

  @Column("varchar", { name: "phoneNumber", nullable: true })
  phoneNumber: string;

=======
  @Column("varchar", { name: "email", nullable: true })
  email: string;

  @Column("varchar", { name: "socialId" })
  socialId: string;

  @Column("varchar", { name: "password", nullable: true })
  password: string;

>>>>>>> c28c7a826c1220c7c1cdc06b3f03665771d3569e
  @Column("int", { name: "point" })
  point: number;

  @Column("varchar", { name: "nickname" })
  nickname: string;

<<<<<<< HEAD
=======
  @Column("varchar", { name: "profileImg" })
  profileImg: string;

>>>>>>> c28c7a826c1220c7c1cdc06b3f03665771d3569e
  @Column("int", { name: "TierId" })
  TierId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Tier, (Tier) => Tier.User, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "TierId", referencedColumnName: "id" }])
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

import { CommentEntity } from 'src/comments/entities/comment.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { LikeEntity } from 'src/likes/entities/like.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IUser } from '../interfaces/user.interface';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @Column({ nullable: false, unique: true })
  username: string;

  @Column()
  cellphone: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  photo_url: string;

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity;
}

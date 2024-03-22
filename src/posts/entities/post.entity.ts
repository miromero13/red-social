import { CommentEntity } from 'src/comments/entities/comment.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { LikeEntity } from 'src/likes/entities/like.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IPost } from '../interfaces/post.interface';

@Entity({ name: 'posts' })
export class PostEntity extends BaseEntity implements IPost {
  @Column()
  content: string;

  @Column()
  photo_url: string;

  @ManyToOne(() => UsersEntity, (user) => user.posts)
  user: UsersEntity;

  @OneToMany(() => LikeEntity, (like) => like.post)
  likes: LikeEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity;
}

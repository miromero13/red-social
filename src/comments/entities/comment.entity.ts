import { BaseEntity } from 'src/common/entities/base.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IComment } from '../interfaces/comment.interface';

@Entity('comment')
export class CommentEntity extends BaseEntity implements IComment {
  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => UsersEntity, (user) => user.comments)
  user: UsersEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  post: PostEntity;
}

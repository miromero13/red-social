import { BaseEntity } from 'src/common/entities/base.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity('likes')
export class LikeEntity extends BaseEntity {
  @ManyToOne(() => UsersEntity, (user) => user.likes)
  user: UsersEntity;

  @ManyToOne(() => PostEntity, (post) => post.likes)
  post: PostEntity;
}

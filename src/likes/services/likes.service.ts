import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from '../entities/like.entity';
import { Repository } from 'typeorm';
import { PostsService } from 'src/posts/services/posts.service';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity) private likeRepo: Repository<LikeEntity>,
    private postService: PostsService,
    private userService: UsersService,
  ) {}

  async createLike(postId: string, userId: string) {
    try {
      const postFound: PostEntity = await this.postService.getPost(postId);
      const userFound: UsersEntity = await this.userService.getUser(userId);

      if (!postFound)
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

      if (!userFound)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const newLike: LikeEntity = this.likeRepo.create({
        post: postFound,
        user: postFound.user,
      });
      return this.likeRepo.save(newLike);
    } catch (error) {
      throw error;
    }
  }

  async deleteLike(likeId: string): Promise<void> {
    try {
      const likeFound: LikeEntity = await this.likeRepo.findOne({
        where: {
          id: likeId,
        },
      });

      if (!likeFound)
        throw new HttpException('Like not found', HttpStatus.NOT_FOUND);

      await this.likeRepo.delete(likeId);
      return;
    } catch (error) {
      throw error;
    }
  }
}

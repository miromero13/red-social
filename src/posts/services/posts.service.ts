import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/users/entities/user.entity';
import { createPostDto } from '../dto/create-post.dto';
import { UsersService } from 'src/users/services/users.service';
import { updatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity) private postRepo: Repository<PostEntity>,
    private userService: UsersService,
  ) {}

  async createPost(post: createPostDto, userId: string) {
    try {
      const userFound: UsersEntity = await this.userService.getUser(userId);

      if (!userFound)
        throw new HttpException('User not Found', HttpStatus.NOT_FOUND);

      const newPost: PostEntity = this.postRepo.create({
        content: post.content,
        photo_url: post.photo_url,
        user: userFound,
      });
      return this.postRepo.save(newPost);
    } catch (error) {
      throw error;
    }
  }

  getPosts(): Promise<PostEntity[]> {
    return this.postRepo.find();
  }

  async getPost(postId: string): Promise<PostEntity> {
    try {
      const postFound: PostEntity = await this.postRepo.findOne({
        where: {
          id: postId,
        },
      });

      if (!postFound)
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

      return postFound;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId: string): Promise<void> {
    try {
      const postFound: PostEntity = await this.postRepo.findOne({
        where: {
          id: postId,
        },
      });

      if (!postFound)
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

      await this.postRepo.delete(postId);
      return;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(postId: string, post: updatePostDto): Promise<PostEntity> {
    try {
      const postFound: PostEntity = await this.postRepo.findOne({
        where: {
          id: postId,
        },
      });

      if (!postFound)
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

      const updatePost: PostEntity = Object.assign(post, postFound);
      return this.postRepo.save(updatePost);
    } catch (error) {
      throw error;
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/posts/entities/post.entity';
import { PostsService } from 'src/posts/services/posts.service';
import { createCommentDto } from '../dto/create-comment.dto';
import { updatePostDto } from 'src/posts/dto/update-post.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
    private postService: PostsService,
    private userService: UsersService,
  ) {}

  async createComment(
    postId: string,
    comment: createCommentDto,
    userId: string,
  ): Promise<CommentEntity> {
    try {
      const postFound: PostEntity = await this.postService.getPost(postId);
      const userFound: UsersEntity = await this.userService.getUser(userId);

      if (!postFound)
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

      if (!userFound)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const newComment: CommentEntity = this.commentRepo.create({
        content: comment.content,
        post: postFound,
        user: userFound,
      });

      return this.commentRepo.save(newComment);
    } catch (error) {
      throw error;
    }
  }

  getComments(): Promise<CommentEntity[]> {
    return this.commentRepo.find();
  }

  async getComment(commentId: string): Promise<CommentEntity> {
    try {
      const commentFound: CommentEntity = await this.commentRepo.findOne({
        where: {
          id: commentId,
        },
      });

      if (!commentFound)
        throw new HttpException('Comment not Found', HttpStatus.NOT_FOUND);

      return commentFound;
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(commentId: string): Promise<void> {
    try {
      const commentFound: CommentEntity = await this.commentRepo.findOne({
        where: {
          id: commentId,
        },
      });

      if (!commentFound)
        throw new HttpException('Comment not Found', HttpStatus.NOT_FOUND);

      await this.commentRepo.delete(commentId);

      return;
    } catch (error) {
      throw error;
    }
  }

  async updateComment(
    commentId: string,
    comment: updatePostDto,
  ): Promise<CommentEntity> {
    try {
      const commentFound: CommentEntity = await this.commentRepo.findOne({
        where: {
          id: commentId,
        },
      });

      if (!commentFound)
        throw new HttpException('Comment not Found', HttpStatus.NOT_FOUND);

      const updateComment: CommentEntity = Object.assign(commentFound, comment);
      return this.commentRepo.save(updateComment);
    } catch (error) {
      throw error;
    }
  }
}

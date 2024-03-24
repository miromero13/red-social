import {
  Controller,
  Param,
  Post,
  Body,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { createPostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { updatePostDto } from '../dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post(':userId')
  createPost(
    @Body() newPost: createPostDto,
    @Param('userId') userId: string,
  ): Promise<PostEntity> {
    return this.postService.createPost(newPost, userId);
  }

  @Get()
  getPosts(): Promise<PostEntity[]> {
    return this.postService.getPosts();
  }

  @Get(':postId')
  getPost(@Param('postId') postId: string): Promise<PostEntity> {
    return this.postService.getPost(postId);
  }

  @Delete(':postId')
  deletePost(@Param('postId') postId: string): Promise<void> {
    return this.postService.deletePost(postId);
  }

  @Patch(':postId')
  updatePost(
    @Param('postId') postId: string,
    @Body() updatePost: updatePostDto,
  ): Promise<PostEntity> {
    return this.postService.updatePost(postId, updatePost);
  }
}

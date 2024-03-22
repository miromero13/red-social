import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { createCommentDto } from '../dto/create-comment.dto';
import { CommentEntity } from '../entities/comment.entity';
import { updatePostDto } from 'src/posts/dto/update-post.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Post(':userId/:postId')
  createComment(
    @Body() newComment: createCommentDto,
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ): Promise<CommentEntity> {
    return this.commentService.createComment(postId, newComment, userId);
  }

  @Get()
  getComments(): Promise<CommentEntity[]> {
    return this.commentService.getComments();
  }

  @Get(':commentId')
  getComment(@Param('commentId') commentId: string) {
    return this.commentService.getComment(commentId);
  }

  @Delete(':commentId')
  deleteComment(@Param('commentId') commentId: string) {
    return this.commentService.deleteComment(commentId);
  }

  @Patch(':commentId')
  updateComment(
    @Body() updateComment: updatePostDto,
    @Param('commentId') commentId: string,
  ) {
    return this.commentService.updateComment(commentId, updateComment);
  }
}

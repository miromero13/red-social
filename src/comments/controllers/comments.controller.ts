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
import { ApiTags } from '@nestjs/swagger';
import { updateCommentDto } from '../dto/update-comment.dto';

@ApiTags('Comments')
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
    @Body() updateComment: updateCommentDto,
    @Param('commentId') commentId: string,
  ) {
    return this.commentService.updateComment(commentId, updateComment);
  }
}

import { Controller, Delete, Param, Post } from '@nestjs/common';
import { LikesService } from '../services/likes.service';
import { LikeEntity } from '../entities/like.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private likeService: LikesService) {}

  @Post(':userId/:postId')
  createLike(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ): Promise<LikeEntity> {
    return this.likeService.createLike(postId, userId);
  }

  @Delete(':likeId')
  deleteLike(@Param('likeId') likeId: string): Promise<void> {
    return this.likeService.deleteLike(likeId);
  }
}

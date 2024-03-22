import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';
import { LikesService } from './services/likes.service';
import { LikesController } from './controllers/likes.controller';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity]), PostsModule, UsersModule],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}

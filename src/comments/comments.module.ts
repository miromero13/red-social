import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { PostsModule } from 'src/posts/posts.module';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    PostsModule,
    UsersModule,
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}

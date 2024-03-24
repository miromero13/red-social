import { ApiProperty } from '@nestjs/swagger';

export class updatePostDto {
  @ApiProperty({
    description: 'Post content',
    type: String,
    example: 'This is a post',
    required: false,
  })
  content?: string;

  @ApiProperty({
    description: 'Photo URL',
    type: String,
    example: 'photo.jpg',
    required: false,
  })
  photo_url?: string;
}

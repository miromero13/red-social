import { ApiProperty } from '@nestjs/swagger';

export class createPostDto {
  @ApiProperty({
    description: 'Post Content',
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

  @ApiProperty({
    description: 'ID of the user who created the post',
    type: String,
    example: '123456',
  })
  user: string;
}

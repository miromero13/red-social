import { ApiProperty } from '@nestjs/swagger';

export class createCommentDto {
  @ApiProperty({
    description: 'Comment content',
    type: String,
    example: 'this is a comment',
  })
  content: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class updateCommentDto {
  @ApiProperty({
    description: 'Comment content',
    type: String,
    example: 'this is a comment',
    required: false,
  })
  content?: string;
}

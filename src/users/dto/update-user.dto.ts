import { ApiProperty } from '@nestjs/swagger';

export class updateUserDto {
  @ApiProperty({
    description: 'Username',
    type: String,
    example: 'Joaquin Chumacero',
    required: false,
  })
  username?: string;

  @ApiProperty({
    description: 'Cellphone number',
    type: Number,
    example: 61234567,
    required: false,
  })
  cellphone?: number;

  @ApiProperty({
    description: 'Email',
    type: String,
    example: 'joaquin@gmail.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'Password',
    type: String,
    example: '12345678',
    required: false,
  })
  password?: string;

  @ApiProperty({
    description: 'Photo URL',
    type: String,
    example: 'photo.jpg',
    required: false,
  })
  photo_url?: string;
}

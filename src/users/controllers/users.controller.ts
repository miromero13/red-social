import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersEntity } from '../entities/user.entity';
import { createUserDto } from '../dto/create-user.dto';
import { updateUserDto } from '../dto/update-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() newUser: createUserDto): Promise<UsersEntity> {
    return this.userService.createUser(newUser);
  }

  @Get()
  getUsers(): Promise<UsersEntity[]> {
    return this.userService.getUsers();
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string): Promise<UsersEntity> {
    return this.userService.getUser(userId);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string): Promise<void> {
    return this.userService.deleteUser(userId);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUser: updateUserDto,
  ): Promise<UsersEntity> {
    return this.userService.updateUser(userId, updateUser);
  }
}

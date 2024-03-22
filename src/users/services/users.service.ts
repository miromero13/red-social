import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from '../dto/create-user.dto';
import { updateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepo: Repository<UsersEntity>,
  ) {}

  async createUser(user: createUserDto): Promise<UsersEntity> {
    try {
      const userFound: UsersEntity = await this.userRepo.findOne({
        where: {
          username: user.username,
        },
      });

      if (userFound) throw new HttpException('User Found', HttpStatus.CONFLICT);

      const newUser: UsersEntity = this.userRepo.create(user);
      return await this.userRepo.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  getUsers(): Promise<UsersEntity[]> {
    return this.userRepo.find();
  }

  async getUser(userId: string): Promise<UsersEntity> {
    try {
      const userFound: UsersEntity = await this.userRepo.findOne({
        where: {
          id: userId,
        },
        relations: ['posts'],
      });

      if (!userFound)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      return userFound;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const userFound: UsersEntity = await this.userRepo.findOne({
        where: {
          id: userId,
        },
      });

      if (!userFound)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      await this.userRepo.delete(userId);

      return;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: string, user: updateUserDto): Promise<UsersEntity> {
    try {
      const userFound: UsersEntity = await this.userRepo.findOne({
        where: {
          id: userId,
        },
      });

      if (!userFound)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const updateUser = Object.assign(userFound, user);
      return this.userRepo.save(updateUser);
    } catch (error) {
      throw error;
    }
  }
}

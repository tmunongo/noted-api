// src/user/user.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { generateHashedPassword } from 'src/utils/generateHashedPassword';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    const { password, hashedPassword } = await generateHashedPassword(
      user.password,
    );

    console.log(`User created: ${JSON.stringify(user)}`);

    return this.userService.create(
      user.username,
      user.email,
      user.firstName,
      user.lastName,
      hashedPassword,
    );
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User | undefined> {
    return this.userService.findOne(id);
  }

  @Get('username/:username')
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<User | undefined> {
    return this.userService.findOneByUsername(username);
  }
}

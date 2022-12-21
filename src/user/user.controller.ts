import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { user as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post()
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get()
  async getUser(
    @Body() userData: { id?: string, email?: string },
  ): Promise<UserModel> {
    return this.userService.user(userData);
  }


}

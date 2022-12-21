import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { PrismaService } from '@/common/frameworks/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserResolver, PrismaService],
  exports: [UserService]
})
export class UserModule { }


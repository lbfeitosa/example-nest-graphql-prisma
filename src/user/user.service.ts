import { PrismaService } from '@/common/frameworks/prisma.service';
import { Injectable } from '@nestjs/common';
import { user, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  async user(
    userWhereUniqueInput: Prisma.userWhereUniqueInput,
  ): Promise<user | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        tasks: true
      }
    });
  }

  async createUser(data: Prisma.userCreateInput): Promise<user> {
    console.log({ data })

    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.userWhereUniqueInput;
    data: Prisma.userUpdateInput;
  }): Promise<user> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.userWhereUniqueInput): Promise<user> {
    return this.prisma.user.delete({
      where,
    });
  }
}
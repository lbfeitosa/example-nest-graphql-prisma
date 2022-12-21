import { Injectable } from '@nestjs/common';
import { task, Prisma, taskOperation } from '@prisma/client';
import { PrismaService } from 'src/common/frameworks/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  async task(
    taskWhereUniqueInput: Prisma.taskWhereUniqueInput,
    includeOperations = true
  ): Promise<task | null> {
    return this.prisma.task.findUnique({
      where: taskWhereUniqueInput,
      ...(includeOperations && {
        include: {
          taskOperations: true
        }
      })
    });
  }

  async taskOperations(
    taskOperationWhereUniqueInput: Prisma.taskOperationWhereUniqueInput
  ): Promise<taskOperation[] | null> {
    return this.prisma.taskOperation.findMany({
      where: taskOperationWhereUniqueInput
    });
  }

  async tasks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.taskWhereUniqueInput;
    where?: Prisma.taskWhereInput;
    orderBy?: Prisma.taskOrderByWithRelationInput;
  }): Promise<task[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.task.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTask(data: Prisma.taskCreateInput): Promise<task> {
    return this.prisma.task.create({
      data,
    });
  }

  async updateTask(params: {
    where: Prisma.taskWhereUniqueInput;
    data: Prisma.taskUpdateInput;
  }): Promise<task> {
    const { data, where } = params;
    return this.prisma.task.update({
      data,
      where,
    });
  }

  async deleteTask(where: Prisma.taskWhereUniqueInput): Promise<task> {
    return this.prisma.task.delete({
      where,
    });
  }
}
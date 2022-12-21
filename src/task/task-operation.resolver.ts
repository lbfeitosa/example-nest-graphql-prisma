import 'reflect-metadata'
import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Root,
  InputType,
  Field,
} from '@nestjs/graphql'
import { Inject } from '@nestjs/common'
import { user } from 'src/common/entities/user'
import { task } from 'src/common/entities/task'
import { PrismaService } from 'src/common/frameworks/prisma.service'
import { TaskService } from './task.service'
import { taskOperation } from '@/common/entities/taskOperation'


@InputType()
export class TaskCreateInput {
  @Field()
  fileLocation: string

  @Field({ nullable: true })
  fileName: string

  @Field()
  userId: string
}

@Resolver(taskOperation)
export class TaskOperationResolver {
  constructor(
    readonly taskService: TaskService,
    @Inject(PrismaService) private prismaService: PrismaService) { }

  // @ResolveField()
  // user(@Root() taskOperation: taskOperation): Promise<user | null> {
  //   return this.prismaService.taskOperation
  //     .findUnique({
  //       where: {
  //         id: taskOperation.id,
  //       },
  //     })
  //     .user()
  // }


  @Query((returns) => taskOperation, { nullable: true })
  getTaskOperations(@Args('taskId') id: string) {
    return this.taskService.taskOperations({ id })
  }
}
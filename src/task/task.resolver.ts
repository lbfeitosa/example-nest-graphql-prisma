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


@InputType()
export class TaskCreateInput {
  @Field()
  fileLocation: string

  @Field({ nullable: true })
  fileName: string

  @Field()
  userId: string
}

@Resolver(task)
export class TaskResolver {
  constructor(
    readonly taskService: TaskService,
    @Inject(PrismaService) private prismaService: PrismaService) { }

  @ResolveField()
  user(@Root() task: task): Promise<user | null> {
    return this.prismaService.task
      .findUnique({
        where: {
          id: task.id,
        },
      })
      .user()
  }

  @Query((returns) => task, { nullable: true })
  getTask(@Args('id') id: string) {
    return this.taskService.task({ id })
  }

  // @Query((returns) => [Task])
  // feed(
  //   @Args('searchString', { nullable: true }) searchString: string,
  //   @Args('skip', { nullable: true }) skip: number,
  //   @Args('take', { nullable: true }) take: number,
  //   @Args('orderBy', { nullable: true }) orderBy: TaskOrderByUpdatedAtInput,
  //   @Context() ctx,
  // ) {
  //   const or = searchString
  //     ? {
  //       OR: [
  //         { fileLocation: { contains: searchString } },
  //         { fileName: { contains: searchString } },
  //       ],
  //     }
  //     : {}

  //   return this.prismaService.task.findMany({
  //     where: {
  //       ...or,
  //     },
  //     take: take || undefined,
  //     skip: skip || undefined,
  //     orderBy: orderBy || undefined,
  //   })
  // }

  // @Mutation((returns) => Task)
  // createDraft(
  //   @Args('data') data: TaskCreateInput,
  //   @Args('authorEmail') authorEmail: string,
  //   @Context() ctx,
  // ): Promise<Task> {
  //   return this.prismaService.task.create({
  //     data: {
  //       fileLocation: data.fileLocation,
  //       fileName: data.fileName,
  //       user: {
  //         connect: { id: data.userId },
  //       },
  //     },
  //   })
  // }

  // @Mutation((returns) => Task, { nullable: true })
  // async deleteTask(
  //   @Args('id') id: string,
  //   @Context() ctx,
  // ): Promise<Task | null> {
  //   return this.prismaService.task.delete({
  //     where: {
  //       id: id,
  //     },
  //   })
  // }
}
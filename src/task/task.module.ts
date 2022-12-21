import { Module } from '@nestjs/common'
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { TaskResolver } from './task.resolver'
import { PrismaService } from 'src/common/frameworks/prisma.service'
import { TaskOperationResolver } from './task-operation.resolver'

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskResolver, TaskOperationResolver, PrismaService],
})
export class TaskModule { }

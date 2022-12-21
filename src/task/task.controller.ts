import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { task as TaskModel } from '@prisma/client';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  ) { }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<TaskModel> {
    return this.taskService.task({ id });
  }

  @UseGuards(AuthGuard)
  @Post()
  async createTask(
    @Body() taskData: { fileLocation: string; fileName: string; userId: string },
  ): Promise<TaskModel> {
    const { fileLocation, fileName, userId } = taskData;
    return this.taskService.createTask({
      fileLocation,
      fileName,
      user: {
        connect: { id: userId },
      },
    });
  }
}

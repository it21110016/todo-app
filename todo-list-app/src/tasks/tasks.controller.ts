// Import the necessary decorators and modules from Nest.js
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) { }

  // Route to get all tasks
  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  // Route to create a new task
  @Post()
  async createTask(
    @Body() task: {
      readonly title: string;
      readonly description: string;
      readonly completed: boolean;
    },
  ): Promise<{ message: string; task: Task }> {
    const createdTaskResult = await this.taskService.create(task);

    return {
      message: createdTaskResult.message,
      task: createdTaskResult.task,
    };
  }

  // Route to get a specific task by ID
  @Get(':id')
  async getTask(
    @Param('id')
    id: string,
  ): Promise<Task> {
    return this.taskService.findById(id);
  }

  // Route to update a task by ID
  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() task: {
      readonly title: string;
      readonly description: string;
      readonly completed: boolean;
    },
  ): Promise<{ message: string; updatedTask: Task }> {
    const updatedTaskResult = await this.taskService.updateById(id, task);

    return {
      message: updatedTaskResult.message,
      updatedTask: updatedTaskResult.updatedTask,
    };
  }

  // Route to delete a task by ID
  @Delete(':id')
  async deleteTask(
    @Param('id')
    id: string,
  ): Promise<Task> {
    return this.taskService.deleteById(id);
  }
}
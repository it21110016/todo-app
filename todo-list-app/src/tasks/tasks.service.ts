import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Task } from './schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: mongoose.Model<Task>,
  ) { }

  // Retrieve all tasks from the database
  async findAll(): Promise<Task[]> {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  // Create a new task in the database
  async create(task: Task): Promise<{ message: string; task: Task }> {
    try {
      const createdTask = await this.taskModel.create(task);
      return {
        message: 'Task added successfully.',
        task: createdTask,
      };
    } catch (error) {
      if (error.code === 11000) {
        // Handle duplicate key error (e.g., unique constraint violation)  throw new ConflictException('Task could not be added. Duplicate task.');
      } else {
        throw new ConflictException('Task could not be added. An error occurred.');
      }
    }
  }

  // Find a task by its ID
  async findById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);

    // If task not found, throw a NotFoundException
    if (!task) {
      throw new NotFoundException('Task with the given ID not found.');
    }

    return task;
  }

  // Update a task by its ID
  async updateById(id: string, task: Task): Promise<{ message: string; updatedTask: Task }> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, task, {
      new: true,
      runValidators: true,
    });

    // If task not found, throw a NotFoundException
    if (!updatedTask) {
      throw new NotFoundException('Could not update. Task with the given ID not found.');
    }

    return {
      message: 'Task updated successfully.',
      updatedTask,
    };
  }

  // Delete a task by its ID
  async deleteById(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id);

    // If task not found, throw a NotFoundException
    if (!deletedTask) {
      throw new NotFoundException('Could not delete. Task with the given ID not found.');
    }

    return deletedTask;
  }
}

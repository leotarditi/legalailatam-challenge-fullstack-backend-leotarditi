import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import type { CreateTaskDto } from './dto/create-task.dto';
import type { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from 'src/schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task | null> {
    return this.taskModel.findById(id).exec();
  }

  async delete(id: string): Promise<Task | null> {
    return this.taskModel.findByIdAndDelete(id);
  }

  async update(id: string, createTaskDto: UpdateTaskDto): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(id, createTaskDto, { new: true });
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import type { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(user: UserActiveInterface): Promise<Task[]> {
    if (user.role === Role.ADMIN) {
      return await this.taskModel.find().exec();
    }
    return await this.taskModel.find({ user: user.email }).exec();
  }

  async findOne(id: string, user: UserActiveInterface): Promise<Task | null> {
    const task = await this.taskModel.findById(id).exec();

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    this.validateOwnership(task, user);

    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: UserActiveInterface,
  ): Promise<Task | null> {
    await this.findOne(id, user);

    return await this.taskModel
      .findByIdAndUpdate(
        id,
        {
          ...updateTaskDto,
        },
        { new: true }, // Esto devuelve el documento actualizado
      )
      .exec();
  }

  async delete(id: string, user: UserActiveInterface): Promise<Task | null> {
    await this.findOne(id, user);

    return await this.taskModel.findByIdAndDelete(id);
  }

  private validateOwnership(task: Task, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && task.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }
}

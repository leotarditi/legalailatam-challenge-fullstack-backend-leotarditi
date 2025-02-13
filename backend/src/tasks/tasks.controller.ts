import {
  Body,
  ConflictException,
  NotFoundException,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { Query } from 'mongoose';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';

@Auth(Role.USER)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(@ActiveUser() user: UserActiveInterface) {
    return this.tasksService.findAll(user);
  }

  @Post()
  async create(
    @Body() body: CreateTaskDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    try {
      return await this.tasksService.create({ ...body, user: user.email });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task already exists');
      }
      throw error;
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @ActiveUser() user: UserActiveInterface,
  ) {
    const task = await this.tasksService.findOne(id, user);
    if (!task) throw new NotFoundException('Task does not exist!');
    return task;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    const task = await this.tasksService.update(id, body, user);
    if (!task) throw new NotFoundException('Task does not exist!');
    return task;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param('id') id: string,
    @ActiveUser() user: UserActiveInterface,
  ) {
    const task = await this.tasksService.delete(id, user);
    if (!task) throw new NotFoundException('Task does not exist!');
    return task;
  }
}

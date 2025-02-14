import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  findOneByEmailWithPassword(email: string) {
    return this.userModel
      .findOne({ email })
      .select('_id name email password role');
  }

  findAll() {
    return this.userModel.find();
  }
}

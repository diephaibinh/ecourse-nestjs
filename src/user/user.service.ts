import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findByUserId(userId: string): Promise<Omit<User, 'password'>> {
    const user = await this.userModel
      .findById(userId)
      .select('-password')
      .exec();
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async findByUserEmail(userEmail: string): Promise<User> {
    const user = await this.userModel.findOne({ email: userEmail }).exec();
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
}

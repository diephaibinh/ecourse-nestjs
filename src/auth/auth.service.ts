import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import { RegisterDto, LoginDto } from './auth.dto';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterDto): Promise<Partial<User>> {
    const { email, password } = registerUserDto;
    const existingUser = await this.userService.findByUserEmail(email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new this.userModel({
      email: email,
      password: hashedPassword,
    }).save();
    const { password: _, ...userInfo } = newUser.toObject();

    return userInfo;
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user || !bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwtService.signAsync({
      id: user._id,
      email: user.email,
    });
    return { token };
  }
}

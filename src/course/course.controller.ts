import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    try {
      return this.courseService.createCourse(createCourseDto);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getAllCourses() {
    try {
      return this.courseService.findAll();
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async getCourseById(@Param('id') courseId: string) {
    try {
      return this.courseService.findOne(courseId);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async updateCourse(
    @Param('id') courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    try {
      return this.courseService.updateCourse(courseId, updateCourseDto);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async deleteCourse(@Param('id') courseId: string) {
    try {
      return this.courseService.deleteCourse(courseId);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

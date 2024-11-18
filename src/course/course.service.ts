import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, Lesson, CourseTopic } from './course.schema';
import {
  CreateCourseDto,
  UpdateCourseDto,
  CreateLessonDto,
} from './course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Lesson.name) private lessonModel: Model<Lesson>,
    @InjectModel(CourseTopic.name) private topicModel: Model<CourseTopic>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const { lessons, topic, ...courseData } = createCourseDto;
    const lessonsCreated = await Promise.all(
      lessons.map(async (lesson) => {
        const lessonDoc = new this.lessonModel(lesson);
        return lessonDoc.save();
      }),
    );
    const topicCreated = await new this.topicModel({name: topic}).save()

    const newCourse = new this.courseModel({
      ...courseData,
      lessons: lessonsCreated.map(lesson => lesson._id),
      topic: topicCreated._id,
    });
    return newCourse.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findOne(courseId: string): Promise<Course> {
    return this.courseModel.findById(courseId).exec();
  }

  async updateCourse(
    courseId: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.courseModel.findByIdAndUpdate(courseId, updateCourseDto, {
      new: true,
    });
  }

  async deleteCourse(courseId: string): Promise<Course> {
    return this.courseModel.findByIdAndDelete(courseId);
  }
}

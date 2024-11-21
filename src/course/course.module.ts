import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Course,
  CourseSchema,
  Lesson,
  LessonSchema,
  CourseTopic,
  CourseTopicSchema,
} from './course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
    MongooseModule.forFeature([
      { name: CourseTopic.name, schema: CourseTopicSchema },
    ]),
  ],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}

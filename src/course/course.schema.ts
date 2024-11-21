import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';

@Schema({ timestamps: true })
export class Lesson extends Document {
  @Prop({ default: uuidv4, unique: true })
  pk: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User;
}

@Schema({ timestamps: true })
export class CourseTopic extends Document {
  @Prop({ default: uuidv4, unique: true })
  pk: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User;
}

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ default: uuidv4, unique: true })
  pk: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop([String])
  tags: string[];

  @Prop({ type: Types.ObjectId, ref: 'CourseTopic' })
  topic: CourseTopic;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Lesson' }], default: [] })
  lessons: Lesson[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
export const CourseSchema = SchemaFactory.createForClass(Course);
export const CourseTopicSchema = SchemaFactory.createForClass(CourseTopic);

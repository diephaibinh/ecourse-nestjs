import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop([String])
  tags: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);

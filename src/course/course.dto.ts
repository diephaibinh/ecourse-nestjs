import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  name: string;
}

export class CreateLessonDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly content: string;
}

export class CreateCourseDto {
  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsNumber()
  readonly price: number;

  @IsArray()
  @IsOptional()
  readonly tags?: string[];

  @IsArray()
  @IsOptional()
  readonly lessons?: CreateLessonDto[];

  @IsString()
  @IsOptional()
  readonly topic: CreateTopicDto;
}

export class UpdateCourseDto {
  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsNumber()
  readonly price: number;

  @IsArray()
  @IsOptional()
  readonly tags?: string[];
}

import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsOptional()
  tags?: string[];
}

export class UpdateCourseDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsOptional()
  tags?: string[];
}

import { IsString, IsStrongPassword, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  email: string;

  @IsStrongPassword()
  @MinLength(8)
  password: string;
}

export class LoginDto {
  @IsString()
  email: string;

  @MinLength(8)
  password: string;
}

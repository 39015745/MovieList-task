import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { UsernameDoesNotIncludePattern } from './UsernameDoesNotIncludePattern';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @Validate(UsernameDoesNotIncludePattern)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

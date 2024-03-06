import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  login: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  oldPassword: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  newPassword: string;
}

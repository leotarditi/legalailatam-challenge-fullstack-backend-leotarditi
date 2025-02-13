import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserDocument } from 'src/users/entities/user.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  done?: boolean;

  user: string;
}

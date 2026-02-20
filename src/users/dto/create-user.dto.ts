import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;

  @IsIn(Object.values(UserRole), {
    message: 'Role deve ser admin, motorista ou ajudante',
  })
  role: UserRole;
}

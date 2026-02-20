import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsEmail({}, { message: 'O email informado não é válido.' })
  @Transform(({ value }) => value?.trim())
  email: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  @Transform(({ value }) => value?.trim())
  password: string;
}

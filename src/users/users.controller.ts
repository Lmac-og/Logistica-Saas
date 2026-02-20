import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Protege a rota com JWT
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@CurrentUser() user: any) {
    console.log('Usuário logado:', user); // opcional, só para teste
    return this.usersService.findAll();
  }

  // Rota de criação de usuário aberta (registro)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
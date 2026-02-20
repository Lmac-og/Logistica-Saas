import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // Passport usando jwt como padrão
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'segredo_super_forte', // mesma chave do JwtStrategy
      signOptions: { expiresIn: '1d' }, // tempo de expiração
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // registra o strategy
  exports: [AuthService],
})
export class AuthModule {}
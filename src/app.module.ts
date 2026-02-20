import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'logistica_user',
      password: '123456',
      database: 'logistica',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
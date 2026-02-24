import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'logistica_user',
      password: '123456',
      database: 'logistica',
      autoLoadEntities: true, // carrega entidades registradas nos módulos
      synchronize: true, // ⚠ usar false em produção
    }),

    UsersModule,
    AuthModule,
    CompaniesModule,
  ],
})
export class AppModule {}
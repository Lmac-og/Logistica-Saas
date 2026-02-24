import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController], // 👈 ADICIONADO
  providers: [CompaniesService],
  exports: [TypeOrmModule],
})
export class CompaniesModule {}
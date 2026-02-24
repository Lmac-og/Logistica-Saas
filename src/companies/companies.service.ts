import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(data: { name: string; cnpj: string }) {
    const exists = await this.companyRepository.findOne({
      where: { cnpj: data.cnpj },
    });

    if (exists) {
      throw new ConflictException('Empresa já cadastrada');
    }

    const company = this.companyRepository.create(data);
    return this.companyRepository.save(company);
  }
}
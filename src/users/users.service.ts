import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 🔐 LISTAR USUÁRIOS DA EMPRESA
  findAll(companyId: string) {
    return this.userRepository.find({
      where: {
        company: { id: companyId },
      },
      relations: ['company'],
    });
  }

  // 🔐 BUSCAR POR EMAIL (necessário para login)
  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['company'], // 👈 ESSENCIAL para pegar companyId no login
    });
  }

  // 🔐 BUSCAR USUÁRIO POR ID DENTRO DA EMPRESA
  async findOne(id: string, companyId: string) {
    return this.userRepository.findOne({
      where: {
        id,
        company: { id: companyId },
      },
      relations: ['company'],
    });
  }

  // 🔐 CRIAR USUÁRIO VINCULADO À EMPRESA (atualizado)
  async create(data: CreateUserDto, currentUser: any) {
    let companyId: string;

    // 🔐 SUPER_ADMIN pode definir empresa manualmente
    if (currentUser.role === 'super_admin') {
      if (!data.companyId) {
        throw new ConflictException(
          'Super admin deve informar companyId',
        );
      }
      companyId = data.companyId;
    } else {
      // 🔐 ADMIN comum só cria na própria empresa
      companyId = currentUser.companyId;
    }

    const existingUser = await this.userRepository.findOne({
      where: {
        email: data.email,
        company: { id: companyId },
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'Email já cadastrado nesta empresa',
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepository.create({
      ...data,
      password: hashedPassword,
      company: { id: companyId },
    });

    return this.userRepository.save(user);
  }
}
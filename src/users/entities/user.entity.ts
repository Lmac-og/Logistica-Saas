import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Company } from '../../companies/company.entity';

export enum UserRole {
  SUPER_ADMIN = 'super_admin', // importante
  ADMIN = 'admin',
  MOTORISTA = 'motorista',
  AJUDANTE = 'ajudante',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.AJUDANTE,
  })
  role: UserRole;

  @ManyToOne(() => Company, (company) => company.users, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  companyId: string;
}
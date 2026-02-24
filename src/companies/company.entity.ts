import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/entities/user.entity'; // ✅ CORRETO

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => User, (user) => user.company)
  users: User[];
}
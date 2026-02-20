import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum UserRole {
  ADMIN = 'admin',
  MOTORISTA = 'motorista',
  AJUDANTE = 'ajudante',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude() // 👈 ISSO AQUI ESCONDE A SENHA NA RESPOSTA
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.AJUDANTE,
  })
  role: UserRole;
}

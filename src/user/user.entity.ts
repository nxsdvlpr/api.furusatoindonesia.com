import { Blog } from 'src/blog/blog.entity';
import { Role } from 'src/role/role.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs!: Blog[];

  @Column()
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn()
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;
}

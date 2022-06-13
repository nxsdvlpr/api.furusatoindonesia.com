import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  body: string;

  @Column()
  alreadyRead: boolean;
}

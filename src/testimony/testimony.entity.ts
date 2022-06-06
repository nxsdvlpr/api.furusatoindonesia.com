import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Testimony {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  fullname: string;

  @Column()
  profession: string;

  @Column()
  message: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  logo: string;
}

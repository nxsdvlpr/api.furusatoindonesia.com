import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.blogs, {
    onDelete: 'CASCADE',
    nullable: false,
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  slug: string;

  @Column()
  subject: string;

  @Column({ nullable: true })
  subjectJa: string;

  @Column()
  excerpt: string;

  @Column({ nullable: true })
  excerptJa: string;

  @Column()
  body: string;

  @Column({ nullable: true })
  bodyJa: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  published: boolean;

  @Column()
  publishedAt: Date;
}

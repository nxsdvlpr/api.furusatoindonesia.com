import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  slug: string;

  @Column()
  subject: string;

  @Column()
  excerpt: string;

  @Column()
  body: string;

  @Column()
  published: boolean;

  @Column()
  publishedAt: Date;
}

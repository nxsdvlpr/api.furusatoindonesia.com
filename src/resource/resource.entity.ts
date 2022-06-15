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

  @Column({ nullable: true })
  file: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column()
  published: boolean;

  @Column()
  publishedAt: Date;
}

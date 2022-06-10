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
  subjectJp: string;

  @Column()
  excerpt: string;

  @Column({ nullable: true })
  excerptJp: string;

  @Column()
  body: string;

  @Column({ nullable: true })
  bodyJp: string;

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

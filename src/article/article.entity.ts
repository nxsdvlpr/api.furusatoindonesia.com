import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group: string;

  @Column()
  subject: string;

  @Column({ nullable: true })
  subjectJp: string;

  @Column()
  excerpt: string;

  @Column({ nullable: true })
  excerptJp: string;

  @Column({ nullable: true })
  body: string;

  @Column({ nullable: true })
  bodyJp: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  sequence: number;
}

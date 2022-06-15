import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  titleJa: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ nullable: true })
  subtitleJa: string;

  @Column({ nullable: true })
  excerpt: string;

  @Column({ nullable: true })
  excerptJa: string;

  @Column({ nullable: true })
  body: string;

  @Column({ nullable: true })
  bodyJa: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  counter: number;

  @Column()
  published: boolean;

  @Column()
  sequence: number;
}

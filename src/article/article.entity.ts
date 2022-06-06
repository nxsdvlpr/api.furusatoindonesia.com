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
  titleJp: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ nullable: true })
  subtitleJp: string;

  @Column({ nullable: true })
  excerpt: string;

  @Column({ nullable: true })
  excerptJp: string;

  @Column({ nullable: true })
  body: string;

  @Column({ nullable: true })
  bodyJp: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  icon: string;

  @Column()
  sequence: number;
}

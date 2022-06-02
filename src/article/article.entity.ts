import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  group: string;

  @Column()
  subject: string;

  @Column()
  excerpt: string;

  @Column({ nullable: true })
  body: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  sequence: number;
}

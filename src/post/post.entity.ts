import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  titleJp: string;

  @Column()
  excerpt: string;

  @Column({ nullable: true })
  excerptJp: string;

  @Column()
  body: string;

  @Column({ nullable: true })
  bodyJp: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  publish: boolean;

  @Column()
  sequence: number;
}

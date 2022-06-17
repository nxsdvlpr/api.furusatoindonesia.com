import { Factory } from 'nestjs-seeder';
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

  @Factory((faker) => faker.random.number({ min: 1, max: 2 }))
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

  @Factory((faker, ctx) => faker.helpers.slugify(ctx.subject).toLowerCase())
  @Column()
  slug: string;

  @Factory((faker) => faker.random.words() + ' ' + faker.random.alphaNumeric(5))
  @Column()
  subject: string;

  @Column({ nullable: true })
  subjectJa: string;

  @Factory((faker) => faker.lorem.sentence(10))
  @Column()
  excerpt: string;

  @Column({ nullable: true })
  excerptJa: string;

  @Factory((faker) => faker.lorem.sentence(25))
  @Column()
  body: string;

  @Column({ nullable: true })
  bodyJa: string;

  @Factory(
    () =>
      'https://res.cloudinary.com/djtve0hzi/image/upload/v1655176757/api-furusato/publication/blog/qquhnyh6ovjbn2hjqkoq.jpg',
  )
  @Column({ nullable: true })
  image: string;

  @Column()
  published: boolean;

  @Column()
  publishedAt: Date;
}

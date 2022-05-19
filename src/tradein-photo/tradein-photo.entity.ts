import { Factory } from 'nestjs-seeder';
import { Tradein } from 'src/tradein/tradein.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TradeinPhoto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Factory((faker) => faker.random.number({ min: 1, max: 20 }))
  @Column()
  tradeinId!: number;

  @ManyToOne(() => Tradein, (tradein) => tradein.photos, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  tradein!: Tradein;

  @CreateDateColumn()
  createdAt!: Date;

  @Factory(
    (faker) =>
      `${faker.image.imageUrl()}?unique=${faker.random
        .alphaNumeric(3)
        .toLowerCase()}`,
  )
  @Column()
  url!: string;
}

import { Tradein } from 'src/tradein/tradein.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Processor {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Tradein, (tradein) => tradein.processor)
  tradeins!: Tradein[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  name!: string;

  @Column()
  acerCashbackAmount!: number;

  @Column()
  otherCashbackAmount!: number;
}

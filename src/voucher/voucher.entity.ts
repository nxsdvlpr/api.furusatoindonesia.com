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
export class Voucher {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Tradein, (tradein) => tradein.approvedVoucher)
  tradeins!: Tradein[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  code!: string;

  @Column()
  value!: number;
}

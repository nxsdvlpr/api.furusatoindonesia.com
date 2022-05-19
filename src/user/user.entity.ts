import { Partner } from 'src/partner/partner.entity';
import { Role } from 'src/role/role.entity';
import { Tradein } from 'src/tradein/tradein.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn()
  role: Role;

  @Column({ nullable: true })
  partnerId?: number;

  @ManyToOne(() => Partner, (partner) => partner.users)
  @JoinColumn()
  partner: Partner;

  @OneToMany(() => Tradein, (tradein) => tradein.verifierUser)
  tradeins!: Tradein[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column()
  phone!: string;
}

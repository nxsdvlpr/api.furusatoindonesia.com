import { Factory } from 'nestjs-seeder';
import { Tradein } from 'src/tradein/tradein.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PartnerType {
  ACSC = 'acsc',
  COURIER = 'courier',
  STORE = 'store',
}

@Entity()
export class Partner {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => User, (user) => user.partner)
  users!: User[];

  @OneToMany(() => Tradein, (tradein) => tradein.suggestedPartner)
  suggestedTradeins!: Tradein[];

  @OneToMany(() => Tradein, (tradein) => tradein.verifierPartner)
  verifiedTradeins!: Tradein[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Factory((faker) => faker.name.firstName().toLowerCase())
  @Column()
  name!: string;

  @Factory((faker) => faker.internet.email())
  @Column()
  email: string;

  @Factory((faker) => faker.phone.phoneNumber('081#########'))
  @Column({ nullable: true })
  phone: string;

  @Factory((faker) => faker.address.streetAddress())
  @Column({ nullable: true })
  address: string;

  @Factory((faker) => faker.random.arrayElement(Object.values(PartnerType)))
  @Column({ type: 'enum', enum: PartnerType, default: PartnerType.ACSC })
  type!: PartnerType;
}

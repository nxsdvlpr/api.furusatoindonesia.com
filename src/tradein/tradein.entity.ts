import { Factory } from 'nestjs-seeder';
import { TradeinPhoto } from 'src/tradein-photo/tradein-photo.entity';
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
import { User } from 'src/user/user.entity';
import { Partner } from 'src/partner/partner.entity';
import { Voucher } from 'src/voucher/voucher.entity';
import { Processor } from 'src/processor/processor.entity';

export enum TradeinCondition {
  NORMAL = 'normal',
  DEAD = 'dead',
  OTHER = 'other',
}

export enum TradeinStatus {
  NEW = 'new',
  VALIDATED = 'validated',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
}

export enum TradeinBrand {
  ACER = 'Acer',
  ASUS = 'Asus',
  HP = 'HP',
  DELL = 'Dell',
  LENOVO = 'Lenovo',
  OTHER = 'Other',
}

@Entity()
export class Tradein {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => TradeinPhoto, (tradeinPhoto) => tradeinPhoto.tradein)
  photos!: TradeinPhoto[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Factory((faker) => faker.name.firstName())
  @Column()
  name!: string;

  @Factory((faker) => faker.internet.email())
  @Column()
  email!: string;

  @Factory((faker) => faker.phone.phoneNumber('081#########'))
  @Column()
  phone!: string;

  @Factory((faker) => faker.address.streetAddress())
  @Column({ nullable: true })
  address: string;

  @Factory((faker) => faker.random.arrayElement(Object.values(TradeinBrand)))
  @Column({ type: 'enum', enum: TradeinBrand, default: TradeinBrand.ACER })
  brand!: TradeinBrand;

  @Factory((faker) => faker.random.number({ min: 1, max: 5 }))
  @Column()
  processorId: number;

  @ManyToOne(() => Processor, (processor) => processor.tradeins)
  @JoinColumn()
  processor: Processor;

  @Factory((faker) =>
    faker.random.arrayElement(Object.values(TradeinCondition)),
  )
  @Column({
    type: 'enum',
    enum: TradeinCondition,
    default: TradeinCondition.NORMAL,
  })
  condition!: TradeinCondition;

  @Column({ nullable: true })
  description: string;

  @Column()
  pickupDate: Date;

  @Factory((faker) => faker.random.number({ min: 1, max: 5 }))
  @Column({ nullable: true })
  suggestedPartnerId?: number;

  @ManyToOne(() => Partner, (partner) => partner.suggestedTradeins)
  @JoinColumn({ name: 'suggested_partner_id' })
  suggestedPartner: Partner;

  @Factory(() => 'VERO20')
  @Column({ nullable: true })
  potentialVoucher: string;

  @Factory(() => '2000000')
  @Column({ nullable: true })
  potentialCashback: number;

  @Column({ nullable: true })
  voucherCode: string;

  @Column()
  expiredAt: Date;

  @Column({ nullable: true })
  validatedAt?: Date;

  @Column({ nullable: true })
  verifierUserId?: number;

  @ManyToOne(() => User, (user) => user.tradeins)
  @JoinColumn({ name: 'verifier_user_id' })
  verifierUser: User;

  @Column()
  verifierPartnerId?: number;

  @ManyToOne(() => Partner, (partner) => partner.verifiedTradeins)
  @JoinColumn({ name: 'verifier_partner_id' })
  verifierPartner: Partner;

  @Column({ nullable: true })
  approvedVoucherId?: number;

  @ManyToOne(() => Voucher, (voucher) => voucher.tradeins)
  @JoinColumn({ name: 'approved_voucher_id' })
  approvedVoucher: Voucher;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: true })
  shippingReceiptNo: string;

  @Column({ type: 'enum', enum: TradeinStatus, default: TradeinStatus.NEW })
  status!: TradeinStatus;
}

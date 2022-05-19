import {
  Authorize,
  FilterableField,
  FilterableRelation,
  FilterableUnPagedRelation,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import {
  Directive,
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { ProcessorDto } from 'src/processor/dto/processor.dto';
import { PartnerDto } from 'src/partner/dto/partner.dto';

import { TradeinPhotoDto } from 'src/tradein-photo/dto/tradein-photo.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { VoucherDto } from 'src/voucher/dto/voucher.dto';
import {
  TradeinBrand,
  TradeinCondition,
  TradeinStatus,
} from '../tradein.entity';
import { TradeinAuthorizer } from '../tradein.authorizer';

registerEnumType(TradeinCondition, {
  name: 'TradeinCondition',
});

registerEnumType(TradeinStatus, {
  name: 'TradeinStatus',
});

registerEnumType(TradeinBrand, {
  name: 'TradeinBrand',
});

@ObjectType('Tradein')
@Directive('@key(fields: "id")')
@QueryOptions({ enableTotalCount: true })
// @Authorize(TradeinAuthorizer)
@FilterableRelation('suggestedPartner', () => PartnerDto, {
  disableRemove: true,
  nullable: true,
})
@FilterableRelation('verifierUser', () => UserDto, {
  disableRemove: true,
  nullable: true,
})
@FilterableRelation('verifierPartner', () => PartnerDto, {
  disableRemove: true,
  nullable: true,
})
@FilterableRelation('approvedVoucher', () => VoucherDto, {
  disableRemove: true,
  nullable: true,
})
@FilterableRelation('processor', () => ProcessorDto, {
  disableRemove: true,
})
@FilterableUnPagedRelation('photos', () => TradeinPhotoDto, {
  disableRemove: true,
})
export class TradeinDto {
  @IDField(() => ID)
  id: number;

  @FilterableField(() => GraphQLISODateTime)
  createdAt: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt: Date;

  @FilterableField()
  name: string;

  @FilterableField()
  email: string;

  @FilterableField()
  phone: string;

  @FilterableField({ nullable: true })
  address?: string;

  @FilterableField(() => TradeinBrand)
  brand: TradeinBrand;

  @FilterableField(() => ID)
  processorId: number;

  @FilterableField(() => TradeinCondition)
  condition: TradeinCondition;

  @FilterableField({ nullable: true })
  description?: string;

  @FilterableField(() => GraphQLISODateTime)
  pickupDate: Date;

  @FilterableField(() => ID, { nullable: true })
  suggestedPartnerId?: number;

  @FilterableField({ nullable: true })
  potentialVoucher: string;

  @FilterableField({ nullable: true })
  potentialCashback: number;

  @FilterableField({ nullable: true })
  voucherCode?: string;

  @FilterableField(() => GraphQLISODateTime)
  expiredAt: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  validatedAt?: Date;

  @FilterableField(() => ID, { nullable: true })
  verifierUserId?: number;

  @FilterableField(() => ID, { nullable: true })
  verifierPartnerId?: number;

  @FilterableField(() => ID, { nullable: true })
  approvedVoucherId?: number;

  @FilterableField({ nullable: true })
  note?: string;

  @FilterableField({ nullable: true })
  shippingReceiptNo?: string;

  @FilterableField(() => TradeinStatus)
  status: TradeinStatus;
}

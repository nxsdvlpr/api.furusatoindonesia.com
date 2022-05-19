import {
  FilterableField,
  FilterableUnPagedRelation,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { TradeinDto } from 'src/tradein/dto/tradein.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { PartnerType } from '../partner.entity';

registerEnumType(PartnerType, {
  name: 'PartnerType',
});

@ObjectType('Partner')
@QueryOptions({ enableTotalCount: true })
@FilterableUnPagedRelation('users', () => UserDto, {
  disableRemove: true,
})
@FilterableUnPagedRelation('tradeins', () => TradeinDto, {
  disableRemove: true,
})
export class PartnerDto {
  @IDField(() => ID)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @FilterableField()
  name: string;

  @FilterableField()
  email: string;

  @FilterableField({ nullable: true })
  phone?: string;

  @FilterableField({ nullable: true })
  address?: string;

  @FilterableField(() => PartnerType)
  type: PartnerType;
}

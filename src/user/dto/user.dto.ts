import {
  BeforeCreateOne,
  BeforeUpdateOne,
  FilterableField,
  FilterableRelation,
  FilterableUnPagedRelation,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { PartnerDto } from 'src/partner/dto/partner.dto';
import { RoleDto } from 'src/role/dto/role.dto';
import { TradeinDto } from 'src/tradein/dto/tradein.dto';
import { UserBeforeCreateHook } from '../user-berfore-create.hook';
import { UserBeforeUpdateHook } from '../user-berfore-update.hook';

@ObjectType('User')
@BeforeCreateOne(UserBeforeCreateHook)
@BeforeUpdateOne(UserBeforeUpdateHook)
@QueryOptions({ enableTotalCount: true })
@FilterableRelation('role', () => RoleDto, {
  disableRemove: true,
})
@FilterableRelation('partner', () => PartnerDto, {
  disableRemove: true,
  nullable: true,
})
@FilterableUnPagedRelation('tradeins', () => TradeinDto, {
  disableRemove: true,
})
export class UserDto {
  @IDField(() => ID)
  id: number;

  @FilterableField(() => ID)
  roleId: number;

  @FilterableField(() => ID, { nullable: true })
  partnerId?: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @FilterableField()
  username: string;

  @FilterableField()
  password: string;

  @FilterableField()
  name: string;

  @FilterableField()
  phone: string;
}

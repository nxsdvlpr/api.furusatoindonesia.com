import {
  FilterableField,
  FilterableUnPagedRelation,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType('Role')
@QueryOptions({ enableTotalCount: true })
@FilterableUnPagedRelation('users', () => UserDto, {
  disableRemove: true,
})
export class RoleDto {
  @IDField(() => ID)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @FilterableField()
  name: string;

  @FilterableField()
  shortname: string;

  @FilterableField(() => GraphQLJSON, { nullable: true })
  access: string;
}

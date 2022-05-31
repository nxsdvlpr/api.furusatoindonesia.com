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
import { BlogDto } from 'src/blog/dto/blog.dto';
import { RoleDto } from 'src/role/dto/role.dto';
import { UserBeforeCreateHook } from '../hooks/user-berfore-create.hook';
import { UserBeforeUpdateHook } from '../hooks/user-berfore-update.hook';

@ObjectType('User')
@BeforeCreateOne(UserBeforeCreateHook)
@BeforeUpdateOne(UserBeforeUpdateHook)
@QueryOptions({ enableTotalCount: true })
@FilterableRelation('role', () => RoleDto, {
  disableRemove: true,
})
@FilterableUnPagedRelation('blogs', () => BlogDto, {
  disableRemove: true,
})
export class UserDto {
  @IDField(() => ID)
  id: number;

  @FilterableField(() => ID)
  roleId: number;

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

  @FilterableField({ nullable: true })
  phone: string;
}

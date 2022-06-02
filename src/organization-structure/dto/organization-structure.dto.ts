import {
  FilterableField,
  FilterableUnPagedRelation,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { OrganizationPeopleDto } from 'src/organization-people/dto/organization-people.dto';

@ObjectType('OrganizationStructure')
@QueryOptions({ enableTotalCount: true })
@FilterableUnPagedRelation('peoples', () => OrganizationPeopleDto, {
  disableRemove: true,
})
export class OrganizationStructureDto {
  @IDField(() => ID)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @FilterableField()
  subject: string;

  @FilterableField()
  description: string;

  @FilterableField()
  sequence: number;
}

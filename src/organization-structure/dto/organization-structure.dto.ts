import {
  FilterableField,
  FilterableUnPagedRelation,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { OrganizationMemberDto } from 'src/organization-member/dto/organization-member.dto';

@ObjectType('OrganizationStructure')
@QueryOptions({ enableTotalCount: true })
@FilterableUnPagedRelation('members', () => OrganizationMemberDto, {
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

  @FilterableField({ nullable: true })
  subjectJa: string;

  @FilterableField()
  description: string;

  @FilterableField({ nullable: true })
  descriptionJa: string;

  @FilterableField()
  sequence: number;
}

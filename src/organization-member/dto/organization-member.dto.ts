import {
  FilterableField,
  FilterableRelation,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { OrganizationStructureDto } from 'src/organization-structure/dto/organization-structure.dto';

@ObjectType('OrganizationMember')
@QueryOptions({ enableTotalCount: true })
@FilterableRelation('organization', () => OrganizationStructureDto, {
  disableRemove: true,
  nullable: true,
})
export class OrganizationMemberDto {
  @IDField(() => ID)
  id: number;

  @FilterableField(() => ID)
  organizationStructureId: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @FilterableField()
  fullname: string;

  @FilterableField()
  profession: string;

  @FilterableField({ nullable: true })
  professionJa: string;

  @FilterableField({ nullable: true })
  image: string;

  @FilterableField()
  sequence: number;
}

import { IDField } from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class OrganizationMemberInput {
  @IDField(() => ID)
  id: number;

  @Field(() => ID)
  organizationStructureId: number;

  @Field()
  fullname: string;

  @Field()
  profession: string;

  @Field({ nullable: true })
  professionJa: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  sequence?: number;
}

import { IDField } from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class OrganizationStructureInput {
  @IDField(() => ID)
  id: number;

  @Field()
  subject: string;

  @Field()
  description: string;

  @Field()
  sequence: number;
}

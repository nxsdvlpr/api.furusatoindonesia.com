import { IDField } from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class OrganizationStructureInput {
  @IDField(() => ID)
  id: number;

  @Field()
  subject: string;

  @Field({ nullable: true })
  subjectJa: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  descriptionJa: string;

  @Field({ nullable: true })
  sequence?: number;
}

import { IDField } from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class OrganizationStructureInput {
  @IDField(() => ID)
  id: number;

  @Field()
  subject: string;

  @Field({ nullable: true })
  subjectJp: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  descriptionJp: string;

  @Field({ nullable: true })
  sequence?: number;
}

import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { TestimonyInput } from './testimony.input';

@InputType()
export class UpdateTestimonyData extends PartialType(TestimonyInput) {}

@InputType()
export class UpdateTestimonyInput {
  @Field(() => ID)
  id: number;

  @Field(() => UpdateTestimonyData)
  @Type(() => UpdateTestimonyData)
  @ValidateNested()
  update: UpdateTestimonyData;
}

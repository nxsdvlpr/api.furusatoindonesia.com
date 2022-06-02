import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ResourceInput } from './resource.input';

@InputType()
export class UpdateResourceData extends PartialType(ResourceInput) {}

@InputType()
export class UpdateResourceInput {
  @Field(() => ID)
  id: number;

  @Field(() => UpdateResourceData)
  @Type(() => UpdateResourceData)
  @ValidateNested()
  update: UpdateResourceData;
}

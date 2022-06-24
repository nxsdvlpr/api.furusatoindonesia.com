import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('UpdateProfileInput')
export class UpdateProfileInputDto {
  @Field()
  @IsString()
  name!: string;

  @Field()
  @IsString()
  username!: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  @IsString()
  phone!: string;

  @Field()
  @IsString()
  avatar?: string;
}

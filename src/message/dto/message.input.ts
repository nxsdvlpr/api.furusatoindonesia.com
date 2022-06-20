import { IDField } from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsMobilePhone, IsString, Length } from 'class-validator';

@InputType()
export class MessageInput {
  @IDField(() => ID)
  id: number;

  @IsString()
  @Length(4, 255)
  @Field()
  fullname: string;

  @IsEmail()
  @Field()
  email: string;

  @IsMobilePhone('id-ID')
  @Field()
  phone: string;

  @IsString()
  @Field()
  body: string;
}

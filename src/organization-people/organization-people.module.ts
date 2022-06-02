import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationPeople } from './organization-people.entity';
import { OrganizationPeopleDto } from './dto/organization-people.dto';
import { OrganizationPeopleSeeder } from './organization-people.seeder';
import { OrganizationPeopleService } from './organization-people.service';
import { OrganizationPeopleResolver } from './organization-people.resolver';
import { CreateOrganizationPeopleInput } from './dto/create-organization-people.input';
import { UpdateOrganizationPeopleInput } from './dto/update-organization-people.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([OrganizationPeople])],
      services: [OrganizationPeopleService],
      resolvers: [
        {
          DTOClass: OrganizationPeopleDto,
          CreateDTOClass: CreateOrganizationPeopleInput,
          UpdateDTOClass: UpdateOrganizationPeopleInput,
          EntityClass: OrganizationPeople,
          ServiceClass: OrganizationPeopleService,
          enableAggregate: true,
          create: {
            disabled: true,
          },
          update: {
            disabled: true,
          },
        },
      ],
    }),
    TypeOrmModule.forFeature([OrganizationPeople]),
  ],
  providers: [
    OrganizationPeopleResolver,
    OrganizationPeopleSeeder,
    CommonService,
  ],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class OrganizationPeopleModule {}

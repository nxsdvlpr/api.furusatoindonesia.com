import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationMember } from './organization-member.entity';
import { OrganizationMemberDto } from './dto/organization-member.dto';
import { OrganizationMemberSeeder } from './organization-member.seeder';
import { OrganizationMemberService } from './organization-member.service';
import { OrganizationMemberResolver } from './organization-member.resolver';
import { CreateOrganizationMemberInput } from './dto/create-organization-member.input';
import { UpdateOrganizationMemberInput } from './dto/update-organization-member.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([OrganizationMember])],
      services: [OrganizationMemberService],
      resolvers: [
        {
          DTOClass: OrganizationMemberDto,
          CreateDTOClass: CreateOrganizationMemberInput,
          UpdateDTOClass: UpdateOrganizationMemberInput,
          EntityClass: OrganizationMember,
          ServiceClass: OrganizationMemberService,
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
    TypeOrmModule.forFeature([OrganizationMember]),
  ],
  providers: [
    OrganizationMemberResolver,
    OrganizationMemberSeeder,
    CommonService,
  ],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class OrganizationMemberModule {}

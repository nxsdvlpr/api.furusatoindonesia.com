import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationStructure } from './organization-structure.entity';
import { OrganizationStructureDto } from './dto/organization-structure.dto';
import { OrganizationStructureSeeder } from './organization-structure.seeder';
import { OrganizationStructureService } from './organization-structure.service';
import { OrganizationStructureResolver } from './organization-structure.resolver';
import { CreateOrganizationStructureInput } from './dto/create-organization-structure.input';
import { UpdateOrganizationStructureInput } from './dto/update-organization-structure.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([OrganizationStructure])],
      services: [OrganizationStructureService],
      resolvers: [
        {
          DTOClass: OrganizationStructureDto,
          CreateDTOClass: CreateOrganizationStructureInput,
          UpdateDTOClass: UpdateOrganizationStructureInput,
          EntityClass: OrganizationStructure,
          ServiceClass: OrganizationStructureService,
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
    TypeOrmModule.forFeature([OrganizationStructure]),
  ],
  providers: [
    OrganizationStructureResolver,
    OrganizationStructureSeeder,
    CommonService,
  ],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class OrganizationStructureModule {}

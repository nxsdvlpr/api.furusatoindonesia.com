import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resource } from './resource.entity';
import { ResourceDto } from './dto/resource.dto';
import { ResourceSeeder } from './resource.seeder';
import { ResourceService } from './resource.service';
import { ResourceResolver } from './resource.resolver';
import { CreateResourceInput } from './dto/create-resource.input';
import { UpdateResourceInput } from './dto/update-resource.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Resource])],
      services: [ResourceService],
      resolvers: [
        {
          DTOClass: ResourceDto,
          CreateDTOClass: CreateResourceInput,
          UpdateDTOClass: UpdateResourceInput,
          EntityClass: Resource,
          ServiceClass: ResourceService,
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
    TypeOrmModule.forFeature([Resource]),
  ],
  providers: [ResourceResolver, ResourceSeeder, CommonService],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class ResourceModule {}

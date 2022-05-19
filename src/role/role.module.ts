import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './role.entity';
import { RoleDto } from './dto/role.dto';
import { RoleSeeder } from './role.seeder';
import { RoleService } from './role.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Role])],
      services: [RoleService],
      resolvers: [
        {
          DTOClass: RoleDto,
          EntityClass: Role,
          ServiceClass: RoleService,
          enableAggregate: true,
        },
      ],
    }),
    TypeOrmModule.forFeature([Role]),
  ],
  providers: [RoleSeeder, CommonService],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class RoleModule {}

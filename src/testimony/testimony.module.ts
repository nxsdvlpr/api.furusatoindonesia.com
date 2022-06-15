import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Testimony } from './testimony.entity';
import { TestimonyDto } from './dto/testimony.dto';
import { TestimonySeeder } from './testimony.seeder';
import { TestimonyService } from './testimony.service';
import { TestimonyResolver } from './testimony.resolver';
import { CreateTestimonyInput } from './dto/create-testimony.input';
import { UpdateTestimonyInput } from './dto/update-testimony.input';
import { TestimonyController } from './testimony.controller';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Testimony])],
      services: [TestimonyService],
      resolvers: [
        {
          DTOClass: TestimonyDto,
          CreateDTOClass: CreateTestimonyInput,
          UpdateDTOClass: UpdateTestimonyInput,
          EntityClass: Testimony,
          ServiceClass: TestimonyService,
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
    TypeOrmModule.forFeature([Testimony]),
  ],
  controllers: [TestimonyController],
  providers: [TestimonyResolver, TestimonySeeder, CommonService],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class TestimonyModule {}

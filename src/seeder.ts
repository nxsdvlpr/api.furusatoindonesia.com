import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { seeder } from 'nestjs-seeder';
import { getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { QueueOptions } from 'bull';

import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { RoleSeeder } from './role/role.seeder';
import { UserModule } from './user/user.module';
import { UserSeeder } from './user/user.seeder';
import { OptionSeeder } from './option/option.seeder';
import { OptionModule } from './option/option.module';
import { BlogSeeder } from './blog/blog.seeder';
import { BlogModule } from './blog/blog.module';
import { ResourceModule } from './resource/resource.module';
import { ResourceSeeder } from './resource/resource.seeder';
import { ArticleSeeder } from './article/article.seeder';
import { ArticleModule } from './article/article.module';
import { OrganizationStructureSeeder } from './organization-structure/organization-structure.seeder';
import { OrganizationPeopleSeeder } from './organization-people/organization-people.seeder';
import { OrganizationStructureModule } from './organization-structure/organization-structure.module';
import { OrganizationPeopleModule } from './organization-people/organization-people.module';

seeder({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          namingStrategy: new SnakeNamingStrategy(),
        }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<QueueOptions> => ({
        redis: {
          host: configService.get<string>('REDIS_QUEUE_HOST'),
          port: configService.get<number>('REDIS_QUEUE_PORT'),
          password: configService.get<string>('REDIS_QUEUE_PASS'),
        },
      }),
    }),
    CommonModule,
    OptionModule,
    RoleModule,
    UserModule,
    ArticleModule,
    BlogModule,
    ResourceModule,
    OrganizationStructureModule,
    OrganizationPeopleModule,
  ],
}).run([
  OptionSeeder,
  RoleSeeder,
  UserSeeder,
  ArticleSeeder,
  BlogSeeder,
  ResourceSeeder,
  OrganizationStructureSeeder,
  OrganizationPeopleSeeder,
]);

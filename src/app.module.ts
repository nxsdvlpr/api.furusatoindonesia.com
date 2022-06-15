import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { QueueOptions } from 'bull';

import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CommonModule } from './common/common.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { OptionModule } from './option/option.module';
import { BlogModule } from './blog/blog.module';
import { ResourceModule } from './resource/resource.module';
import { ArticleModule } from './article/article.module';
import { OrganizationStructureModule } from './organization-structure/organization-structure.module';
import { OrganizationMemberModule } from './organization-member/organization-member.module';
import { TestimonyModule } from './testimony/testimony.module';
import { MessageModule } from './message/message.module';
import { UploadModule } from './upload/upload.module';
import { TimelineModule } from './timeline/timeline.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
    CommonModule,
    MailModule,
    CloudinaryModule,
    UploadModule,
    OptionModule,
    AuthModule,
    RoleModule,
    UserModule,
    ArticleModule,
    BlogModule,
    ResourceModule,
    OrganizationStructureModule,
    OrganizationMemberModule,
    TestimonyModule,
    MessageModule,
    TimelineModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

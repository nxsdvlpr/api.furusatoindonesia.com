import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConnectionOptions } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { QueueOptions } from 'bull';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CommonModule } from './common/common.module';
import { ApiModule } from './api/api.module';
import { VoucherModule } from './voucher/voucher.module';
import { TradeinModule } from './tradein/tradein.module';
import { TradeinPhotoModule } from './tradein-photo/tradein-photo.module';
import { RoleModule } from './role/role.module';
import { PartnerModule } from './partner/partner.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProcessorModule } from './processor/processor.module';
import { MailModule } from './mail/mail.module';

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
    AuthModule,
    CommonModule,
    MailModule,
    CloudinaryModule,
    ApiModule,
    RoleModule,
    PartnerModule,
    UserModule,
    ProcessorModule,
    VoucherModule,
    TradeinModule,
    TradeinPhotoModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

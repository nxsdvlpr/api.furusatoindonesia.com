import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { CommonModule } from './common/common.module';
import { PartnerModule } from './partner/partner.module';
import { PartnerSeeder } from './partner/partner.seeder';
import { RoleModule } from './role/role.module';
import { RoleSeeder } from './role/role.seeder';
import { TradeinPhotoModule } from './tradein-photo/tradein-photo.module';
import { TradeinPhotoSeeder } from './tradein-photo/tradein-photo.seeder';
import { TradeinModule } from './tradein/tradein.module';
import { TradeinSeeder } from './tradein/tradein.seeder';
import { UserModule } from './user/user.module';
import { UserSeeder } from './user/user.seeder';
import { ProcessorModule } from './processor/processor.module';
import { ProcessorSeeder } from './processor/processor.seeder';
import { VoucherModule } from './voucher/voucher.module';
import { VoucherSeeder } from './voucher/voucher.seeder';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueOptions } from 'bull';

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
    RoleModule,
    PartnerModule,
    UserModule,
    ProcessorModule,
    VoucherModule,
    TradeinModule,
    TradeinPhotoModule,
  ],
}).run([
  RoleSeeder,
  PartnerSeeder,
  UserSeeder,
  ProcessorSeeder,
  VoucherSeeder,
  TradeinSeeder,
  TradeinPhotoSeeder,
]);

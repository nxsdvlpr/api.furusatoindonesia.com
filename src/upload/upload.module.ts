import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { HttpModule } from '@nestjs/axios';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    HttpModule,
    // MulterModule.register({
    //   dest: './upload',
    // }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}

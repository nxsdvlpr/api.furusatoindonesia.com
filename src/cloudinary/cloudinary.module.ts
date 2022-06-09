import { Global, Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { cloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Global()
@Module({
  controllers: [CloudinaryController],
  providers: [cloudinaryProvider, CloudinaryService],
  exports: [cloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}

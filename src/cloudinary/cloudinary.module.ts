import { Global, Module } from '@nestjs/common';
import { cloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Global()
@Module({
  providers: [cloudinaryProvider, CloudinaryService],
  exports: [cloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}

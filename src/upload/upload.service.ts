import { Injectable } from '@nestjs/common';
import { UploadApiOptions } from 'cloudinary';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async upload(
    path: string,
    file: Express.Multer.File,
    options: UploadApiOptions,
  ): Promise<any> {
    return this.cloudinaryService.uploadFromBuffer(path, file, options);
  }
}

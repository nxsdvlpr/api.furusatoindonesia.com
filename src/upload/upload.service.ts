import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async upload(path: string, file: Express.Multer.File): Promise<any> {
    return this.cloudinaryService.upload(path, file);
  }
}

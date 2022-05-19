import { Injectable, Inject } from '@nestjs/common';
import { Cloudinary } from './cloudinary.provider';
import toStream = require('buffer-to-stream');
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { assign } from 'lodash';

@Injectable()
export class CloudinaryService {
  constructor(@Inject(Cloudinary) private cloudinary) {
    this.cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
  }

  async upload(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = this.cloudinary.uploader.upload_stream((result, error) => {
        if (error) {
          return reject(error);
        }

        resolve(
          assign(result, {
            url: result.secure_url,
          }),
        );
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}

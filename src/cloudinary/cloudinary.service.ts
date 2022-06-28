import { Injectable, Inject } from '@nestjs/common';
import * as toStream from 'buffer-to-stream';
import {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
} from 'cloudinary';
import { assign } from 'lodash';

import { Cloudinary } from './cloudinary.provider';

@Injectable()
export class CloudinaryService {
  constructor(@Inject(Cloudinary) private cloudinary) {
    this.cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
  }

  async uploadFromUrl(
    path: string,
    url: string,
    config: UploadApiOptions = {},
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      assign(config, {
        resource_type: 'auto',
        folder: process.env.APP_NAME + '/' + path,
      });

      this.cloudinary.v2.uploader.upload(url, config, (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(
          assign(result, {
            url: result.secure_url,
          }),
        );
      });
    });
  }

  async uploadFromBuffer(
    path: string,
    file: Express.Multer.File,
    config: UploadApiOptions = {},
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      assign(config, {
        resource_type: 'auto',
        folder: process.env.APP_NAME + '/' + path,
      });

      const isImage =
        /image\/png|image\/jpeg|imagesvg\+xml|image\/gif|image\/svg\+xml/.test(
          file.mimetype,
        );

      if (!isImage) {
        assign(config, {
          resource_type: 'raw',
          public_id: file.originalname,
          unique_filename: false,
          use_filename: true,
        });
      }

      const upload = this.cloudinary.v2.uploader.upload_stream(
        config,
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(
            assign(result, {
              url: result.secure_url,
            }),
          );
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}

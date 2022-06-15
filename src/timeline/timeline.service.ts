import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Timeline } from './timeline.entity';
import { InstagramService } from 'src/instagram/instagram.service';
import { assign } from 'lodash';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@QueryService(Timeline)
export class TimelineService extends TypeOrmQueryService<Timeline> {
  constructor(
    @InjectRepository(Timeline)
    private timelineRepository: Repository<Timeline>,
    private readonly instagramService: InstagramService,
    private readonly cloudinaryService: CloudinaryService,
  ) {
    super(timelineRepository);
  }

  async list(): Promise<Timeline[]> {
    return this.timelineRepository
      .createQueryBuilder('timeline')
      .where('timeline.tags ::jsonb ?& :tags', {
        tags: ['#TheEntrepreneur'],
      })
      .orderBy('timeline.takenAt', 'DESC')
      .limit(30)
      .getMany();
  }

  async sync(): Promise<void> {
    const instagramMedias = await this.instagramService.getFeeds();

    for (let i = 0; i < 30; i++) {
      const instagramMedia = instagramMedias[i];
      const timeline = await this.timelineRepository.findOne({
        mediaId: instagramMedia.mediaId,
      });

      if (!timeline) {
        console.log(`insert media with id: ${instagramMedia.mediaId}`);
        const uploadResult = await this.uploadMedia(instagramMedia);

        assign(instagramMedia, {
          url: uploadResult,
        });

        await this.timelineRepository.save(
          assign(new Timeline(), instagramMedia),
        );
        console.log(`insert media with id: ${instagramMedia.mediaId} done`);
      }
    }
  }

  private async uploadMedia(media: any): Promise<any> {
    const result = await this.cloudinaryService.uploadFromUrl(
      'timeline',
      media.url,
      {
        public_id: media.mediaId,
        overwrite: true,
      },
    );

    return {
      large: result.url,
      medium: result.url.replace('/upload/', '/upload/w_600,h_600,c_scale/'),
      small: result.url.replace('/upload/', '/upload/w_150,h_150,c_scale/'),
    };
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Timeline } from './timeline.entity';
import { InstagramService } from 'src/instagram/instagram.service';
import { assign } from 'lodash';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

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

  async list(query: PaginateQuery): Promise<Paginated<Timeline>> {
    const queryBuilder = this.timelineRepository
      .createQueryBuilder('timeline')
      .where('timeline.tags ::jsonb ?& :tags', {
        tags: ['#TheEntrepreneur'],
      });

    return paginate<Timeline>(query, queryBuilder, {
      sortableColumns: ['takenAt'],
      searchableColumns: ['caption', 'tags'],
      defaultSortBy: [['takenAt', 'DESC']],
    });
  }

  async sync(limit: number = null): Promise<void> {
    const instagramMedias = await this.instagramService.getFeeds();
    const length = limit ?? instagramMedias.length;

    for (let i = 0; i < length; i++) {
      const instagramMedia = instagramMedias[i];
      console.log(`checking media with id: ${instagramMedia.mediaId}`);
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

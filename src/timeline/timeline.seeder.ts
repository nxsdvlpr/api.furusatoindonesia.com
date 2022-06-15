import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Timeline } from './timeline.entity';

@Injectable()
export class TimelineSeeder implements Seeder {
  constructor(
    @InjectRepository(Timeline)
    private readonly timelineRepository: Repository<Timeline>,
  ) {}

  async seed(): Promise<any> {
    const timelines = [];

    await this.timelineRepository.save(timelines);
  }

  async drop(): Promise<any> {
    await this.timelineRepository.clear();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { TradeinPhoto } from './tradein-photo.entity';

@Injectable()
export class TradeinPhotoSeeder implements Seeder {
  constructor(
    @InjectRepository(TradeinPhoto)
    private readonly repo: Repository<TradeinPhoto>,
  ) {}

  async seed(): Promise<any> {
    const tradeinPhotos = DataFactory.createForClass(TradeinPhoto).generate(20);
    await this.repo.save(tradeinPhotos);
  }

  async drop(): Promise<any> {
    await this.repo.clear();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Testimony } from './testimony.entity';

@Injectable()
export class TestimonySeeder implements Seeder {
  constructor(
    @InjectRepository(Testimony)
    private readonly testimonyRepository: Repository<Testimony>,
  ) {}

  async seed(): Promise<any> {
    const testimonys = [];

    await this.testimonyRepository.save(testimonys);
  }

  async drop(): Promise<any> {
    await this.testimonyRepository.clear();
  }
}

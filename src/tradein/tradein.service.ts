import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { format } from 'date-fns';

import { Tradein, TradeinStatus } from './tradein.entity';
import { lastDaysDate, QuickOrm } from 'src/utils';
import { CreateTradeinInput } from './dto/create-tradein.input.dto';
import { UpdateTradeinInput } from './dto/update-tradein.input.dto';
import { AuthenticatedUser } from 'src/auth/auth.interfaces';
import { assign, pick } from 'lodash';
import { ValidateVoucherInput } from './dto/validate-voucher.input.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { TradeinSummaryDto } from './dto/tradein-summary.dto';
import { DailyTradeinSummaryDto } from './dto/daily-tradein-summary.dto';

@QueryService(Tradein)
export class TradeinService extends TypeOrmQueryService<Tradein> {
  constructor(
    @InjectRepository(Tradein)
    private tradeinRepository: Repository<Tradein>,
    @InjectQueue('tradein-queue') private tradeinQueue: Queue,
  ) {
    super(tradeinRepository);
  }

  async findAll(): Promise<Tradein[]> {
    return this.tradeinRepository.find({
      relations: [
        'processor',
        'verifierPartner',
        'verifierUser',
        'approvedVoucher',
      ],
      order: { createdAt: 'ASC', id: 'ASC' },
    });
  }

  async create(input: CreateTradeinInput): Promise<Tradein> {
    const tradein = new QuickOrm(this.tradeinRepository).addRelation(
      'photos',
      'id',
    );

    return tradein.create(input);
  }

  async update(
    user: AuthenticatedUser,
    input: UpdateTradeinInput,
  ): Promise<Tradein> {
    // const tradein = await this.tradeinRepository.findOne(input.id);

    // if (
    //   user.role.shortname === 'verifier' &&
    //   tradein.verifierUserId !== user.id
    // ) {
    //   throw new Error('You are not authorized to update this tradein');
    // }

    if (user.role.shortname === 'estore') {
      input.update = pick(input.update, ['shippingReceiptNo', 'status']);
    }

    const tradeinUpdate = new QuickOrm(this.tradeinRepository).addRelation(
      'photos',
      'id',
    );

    return tradeinUpdate.update(input);
  }

  async register(data: any): Promise<Tradein> {
    const input = Object.assign(new Tradein(), data);
    const tradein = await this.tradeinRepository.save(input);

    this.tradeinQueue.add('tradeinCreated', tradein);

    return this.tradeinRepository.findOne(tradein.id, {
      relations: ['processor', 'suggestedPartner'],
    });
  }

  async getByVoucher(voucherCode: string): Promise<Tradein> {
    return this.tradeinRepository.findOne({
      relations: [
        'processor',
        'suggestedPartner',
        'verifierPartner',
        'verifierUser',
      ],
      where: { voucherCode },
    });
  }

  async handleVoucher(
    user: AuthenticatedUser,
    voucherCode: string,
  ): Promise<Tradein> {
    const tradein = await this.tradeinRepository.findOne({
      voucherCode,
    });

    if (!tradein) {
      throw new Error('Invalid voucher code');
    }

    assign(tradein, {
      verifierPartnerId: user.partnerId,
    });

    return this.tradeinRepository.save(tradein);
  }

  async validateVoucher(
    user: AuthenticatedUser,
    input: ValidateVoucherInput,
  ): Promise<Tradein> {
    const tradein = await this.tradeinRepository.findOne(input.id);

    if (!tradein) {
      throw new Error('Invalid voucher code');
    }

    if (
      tradein.verifierPartnerId &&
      tradein.verifierPartnerId !== user.partnerId
    ) {
      throw new Error('You are not authorized to validate this voucher');
    }

    assign(
      tradein,
      assign(input.update, {
        verifierPartnerId: user.partnerId,
        verifierUserId: user.id,
        status: TradeinStatus.VALIDATED,
      }),
    );

    return this.tradeinRepository.save(tradein);
  }

  async summary(): Promise<TradeinSummaryDto> {
    const total = await this.tradeinRepository.count();
    const todayRegistrationCount = await this._todayRegistrationCount();
    const todayVerificationCount = await this._todayVerificationCount();

    return {
      total,
      todayRegistrationCount,
      todayVerificationCount,
    };
  }

  async dailyTradeinSummary(): Promise<DailyTradeinSummaryDto[]> {
    const daysDate = lastDaysDate(7);
    daysDate.sort();

    const dailyTradeinSummary = await this.tradeinRepository
      .createQueryBuilder('tradein')
      .select(
        `SUBSTRING(DATE_TRUNC('day', created_at)::VARCHAR, 0, 11)`,
        'dates',
      )
      .addSelect('COUNT(*)', 'count')
      .groupBy(`DATE_TRUNC('day', created_at)`)
      .getRawMany();

    const result = daysDate.map((date) => {
      const tradein = dailyTradeinSummary.find((item) => item.dates === date);

      return {
        date,
        count: tradein ? tradein.count : 0,
      };
    });

    return result;
  }

  private async _todayRegistrationCount(): Promise<number> {
    const todayRegistrationCount = await this.tradeinRepository
      .createQueryBuilder('tradein')
      .select('COUNT(*)', 'count')
      .where('tradein.status = :status', {
        status: TradeinStatus.NEW,
      })
      .andWhere('DATE(tradein.createdAt) = :today', {
        today: format(new Date(), 'yyyy-MM-dd'),
      })
      .getCount();

    return todayRegistrationCount;
  }

  private async _todayVerificationCount(): Promise<number> {
    const todayVerificationCount = await this.tradeinRepository
      .createQueryBuilder('tradein')
      .select('COUNT(*)', 'count')
      .where('tradein.status = :status', {
        status: TradeinStatus.VALIDATED,
      })
      .andWhere('DATE(tradein.validatedAt) = :today', {
        today: format(new Date(), 'yyyy-MM-dd'),
      })
      .getCount();

    return todayVerificationCount;
  }
}

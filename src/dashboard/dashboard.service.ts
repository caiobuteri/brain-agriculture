import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(private readonly dataSource: DataSource) {}

  async getDashboardData() {
    const totalFarms = await this.dataSource
      .getRepository('farm')
      .createQueryBuilder('farm')
      .where('farm.deletedAt IS NULL')
      .getCount();

    const totalHectares = await this.dataSource
      .getRepository('farm')
      .createQueryBuilder('farm')
      .select('SUM(farm.totalArea)', 'sum')
      .where('farm.deletedAt IS NULL')
      .getRawOne();

    const farmsByState = await this.dataSource
      .getRepository('farm')
      .createQueryBuilder('farm')
      .select('farm.state', 'state')
      .addSelect('COUNT(*)', 'count')
      .where('farm.deletedAt IS NULL')
      .groupBy('farm.state')
      .getRawMany();

    const cropsByName = await this.dataSource
      .getRepository('crop')
      .createQueryBuilder('crop')
      .leftJoin('crop.harvest', 'harvest')
      .leftJoin('harvest.farm', 'farm')
      .select('crop.name', 'name')
      .addSelect('COUNT(*)', 'count')
      .where('crop.deletedAt IS NULL')
      .andWhere('harvest.deletedAt IS NULL')
      .andWhere('farm.deletedAt IS NULL')
      .groupBy('crop.name')
      .getRawMany();

    const landUse = await this.dataSource
      .getRepository('farm')
      .createQueryBuilder('farm')
      .select('SUM(farm.cultivableArea)', 'cultivable')
      .addSelect('SUM(farm.vegetationArea)', 'vegetation')
      .where('farm.deletedAt IS NULL')
      .getRawOne();

    return {
      totalFarms,
      totalHectares: Number(totalHectares?.sum || 0),
      farmsByState,
      cropsByName,
      landUse: {
        cultivable: Number(landUse?.cultivable || 0),
        vegetation: Number(landUse?.vegetation || 0),
      },
    };
  }
}

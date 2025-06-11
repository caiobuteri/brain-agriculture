import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(private readonly dataSource: DataSource) {}

  async getDashboardData() {
    // Número total de fazendas
    const totalFarms: number = await this.dataSource
      .getRepository('farm')
      .createQueryBuilder('farm')
      .where('farm.deletedAt IS NULL')
      .getCount();

    // Soma total de hectares
    const totalHectares: { sum: string | null } | undefined =
      await this.dataSource
        .getRepository('farm')
        .createQueryBuilder('farm')
        .select('SUM(farm.totalArea)', 'sum')
        .where('farm.deletedAt IS NULL')
        .getRawOne();

    // Fazendas agrupadas por estado
    const farmsByState: { state: string; count: string }[] =
      await this.dataSource
        .getRepository('farm')
        .createQueryBuilder('farm')
        .select('farm.state', 'state')
        .addSelect('COUNT(*)', 'count')
        .where('farm.deletedAt IS NULL')
        .groupBy('farm.state')
        .getRawMany();

    // Culturas agrupadas por nome
    const cropsByName: { name: string; count: string }[] = await this.dataSource
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

    // Soma das áreas cultiváveis e de vegetação
    const landUse:
      | { cultivable: string | null; vegetation: string | null }
      | undefined = await this.dataSource
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

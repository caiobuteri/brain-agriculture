import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueKeyOnHarvestsTable1748796050531
  implements MigrationInterface
{
  name = 'UniqueKeyOnHarvestsTable1748796050531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_unique_farm_year_not_deleted"
      ON "harvest" ("farmId", "year")
      WHERE "deletedAt" IS NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX "IDX_unique_farm_year_not_deleted"
    `);
  }
}

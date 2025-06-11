import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDeletedAtField1748574088277 implements MigrationInterface {
  name = 'CreateDeletedAtField1748574088277';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "crop" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "harvest" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "farm" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "producer" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "producer" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "farm" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "harvest" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "crop" DROP COLUMN "deletedAt"`);
  }
}

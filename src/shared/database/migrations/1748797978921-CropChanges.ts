import { MigrationInterface, QueryRunner } from "typeorm";

export class CropChanges1748797978921 implements MigrationInterface {
    name = 'CropChanges1748797978921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crop" DROP CONSTRAINT "FK_b1e3c6af7290ef2901345eb76a0"`);
        await queryRunner.query(`ALTER TABLE "crop" ALTER COLUMN "harvestId" SET NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_unique_harvest_name_not_deleted" ON "crop" ("harvestId", "name") WHERE "deletedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "crop" ADD CONSTRAINT "FK_b1e3c6af7290ef2901345eb76a0" FOREIGN KEY ("harvestId") REFERENCES "harvest"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crop" DROP CONSTRAINT "FK_b1e3c6af7290ef2901345eb76a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_unique_harvest_name_not_deleted"`);
        await queryRunner.query(`ALTER TABLE "crop" ALTER COLUMN "harvestId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "crop" ADD CONSTRAINT "FK_b1e3c6af7290ef2901345eb76a0" FOREIGN KEY ("harvestId") REFERENCES "harvest"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

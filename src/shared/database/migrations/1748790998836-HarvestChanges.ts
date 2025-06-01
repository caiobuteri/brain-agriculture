import { MigrationInterface, QueryRunner } from "typeorm";

export class HarvestChanges1748790998836 implements MigrationInterface {
    name = 'HarvestChanges1748790998836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "harvest" DROP CONSTRAINT "FK_a38adb11da0c303d087df8e3bd0"`);
        await queryRunner.query(`ALTER TABLE "harvest" ALTER COLUMN "farmId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "harvest" ADD CONSTRAINT "FK_a38adb11da0c303d087df8e3bd0" FOREIGN KEY ("farmId") REFERENCES "farm"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "harvest" DROP CONSTRAINT "FK_a38adb11da0c303d087df8e3bd0"`);
        await queryRunner.query(`ALTER TABLE "harvest" ALTER COLUMN "farmId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "harvest" ADD CONSTRAINT "FK_a38adb11da0c303d087df8e3bd0" FOREIGN KEY ("farmId") REFERENCES "farm"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

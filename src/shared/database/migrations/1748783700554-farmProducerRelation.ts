import { MigrationInterface, QueryRunner } from 'typeorm';

export class FarmProducerRelation1748783700554 implements MigrationInterface {
  name = 'FarmProducerRelation1748783700554';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "farm" DROP CONSTRAINT "FK_babd3cbc05a05e30623511fd0c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "farm" ALTER COLUMN "producerId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "farm" ADD CONSTRAINT "FK_babd3cbc05a05e30623511fd0c4" FOREIGN KEY ("producerId") REFERENCES "producer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "farm" DROP CONSTRAINT "FK_babd3cbc05a05e30623511fd0c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "farm" ALTER COLUMN "producerId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "farm" ADD CONSTRAINT "FK_babd3cbc05a05e30623511fd0c4" FOREIGN KEY ("producerId") REFERENCES "producer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}

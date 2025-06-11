import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAndProducerChanges1749671636302 implements MigrationInterface {
  name = 'UserAndProducerChanges1749671636302';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "producer" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "producer" ADD CONSTRAINT "UQ_4288c6992857e1af9db1c6b6eaf" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" ADD CONSTRAINT "FK_4288c6992857e1af9db1c6b6eaf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producer" DROP CONSTRAINT "FK_4288c6992857e1af9db1c6b6eaf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" DROP CONSTRAINT "UQ_4288c6992857e1af9db1c6b6eaf"`,
    );
    await queryRunner.query(`ALTER TABLE "producer" DROP COLUMN "userId"`);
  }
}

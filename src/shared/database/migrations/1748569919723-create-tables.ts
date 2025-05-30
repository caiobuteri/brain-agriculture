import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1748569919723 implements MigrationInterface {
    name = 'CreateTables1748569919723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "harvestId" uuid, CONSTRAINT "PK_f306910b05e2d54ed972a536a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "harvest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "year" integer NOT NULL, "farmId" uuid, CONSTRAINT "PK_84a837e6c60baad24c5a4125f67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "farm" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying(2) NOT NULL, "totalArea" numeric(10,2) NOT NULL, "cultivableArea" numeric(10,2) NOT NULL, "vegetationArea" numeric(10,2) NOT NULL, "producerId" uuid, CONSTRAINT "PK_3bf246b27a3b6678dfc0b7a3f64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "crop" ADD CONSTRAINT "FK_b1e3c6af7290ef2901345eb76a0" FOREIGN KEY ("harvestId") REFERENCES "harvest"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "harvest" ADD CONSTRAINT "FK_a38adb11da0c303d087df8e3bd0" FOREIGN KEY ("farmId") REFERENCES "farm"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "farm" ADD CONSTRAINT "FK_babd3cbc05a05e30623511fd0c4" FOREIGN KEY ("producerId") REFERENCES "producer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farm" DROP CONSTRAINT "FK_babd3cbc05a05e30623511fd0c4"`);
        await queryRunner.query(`ALTER TABLE "harvest" DROP CONSTRAINT "FK_a38adb11da0c303d087df8e3bd0"`);
        await queryRunner.query(`ALTER TABLE "crop" DROP CONSTRAINT "FK_b1e3c6af7290ef2901345eb76a0"`);
        await queryRunner.query(`DROP TABLE "farm"`);
        await queryRunner.query(`DROP TABLE "harvest"`);
        await queryRunner.query(`DROP TABLE "crop"`);
    }

}

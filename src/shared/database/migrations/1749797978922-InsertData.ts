import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertData1749797978922 implements MigrationInterface {
  name = 'InsertData1749797978922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      -- User (vinculado ao produtor)
      INSERT INTO "user" (id, name, email, password, "createdAt", "updatedAt", "deletedAt") VALUES
      ('88888888-8888-8888-8888-888888888888', 'caio.buteri', 'caiobuteri@gmail.com', '$2b$10$Gc8sHiCmDme.qb0H6mTgpeqa0jSyIilVoJJi1Frr9ToFVRkWBtc6G', NOW(), NOW(), NULL);
      
      -- Producer
      INSERT INTO producer (id, "firstName", "lastName", document, "createdAt", "updatedAt", "deletedAt", "userId") VALUES
      ('11111111-1111-1111-1111-111111111111', 'Caio', 'Buteri', '99999999900', NOW(), NOW(), NULL, '88888888-8888-8888-8888-888888888888');

      -- Farms
      INSERT INTO farm (id, name, city, state, "totalArea", "cultivableArea", "vegetationArea", "producerId", "createdAt", "updatedAt", "deletedAt") VALUES
      ('22222222-2222-2222-2222-222222222222', 'Fazenda Boa Terra', 'Uberlândia', 'MG', 120, 80, 30, '11111111-1111-1111-1111-111111111111', NOW(), NOW(), NULL),
      ('33333333-3333-3333-3333-333333333333', 'Fazenda Vale Verde', 'Patos de Minas', 'MG', 100, 60, 25, '11111111-1111-1111-1111-111111111111', NOW(), NOW(), NULL);

      -- Harvests
      INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
      ('44444444-4444-4444-4444-444444444444', 2023, '22222222-2222-2222-2222-222222222222', NOW(), NOW(), NULL),
      ('55555555-5555-5555-5555-555555555555', 2024, '33333333-3333-3333-3333-333333333333', NOW(), NOW(), NULL);

      -- Crops
      INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
      ('66666666-6666-6666-6666-666666666666', 'Milho Safra 2023', '44444444-4444-4444-4444-444444444444', NOW(), NOW(), NULL),
      ('77777777-7777-7777-7777-777777777777', 'Soja Safra 2024', '55555555-5555-5555-5555-555555555555', NOW(), NOW(), NULL);
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}

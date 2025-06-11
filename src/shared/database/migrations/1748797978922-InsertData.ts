import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertData1748797978922 implements MigrationInterface {
  name = 'InsertData1748797978922';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert producers
    //     await queryRunner.query(`INSERT INTO producer (id, "firstName", "lastName", document, "createdAt", "updatedAt", "deletedAt") VALUES
    // ('5811c149-c7c4-4389-8eef-322bed1434dc', 'João', 'Silva', '19538628705', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO producer (id, "firstName", "lastName", document, "createdAt", "updatedAt", "deletedAt") VALUES
    // ('c3c23488-9cc3-4833-ae53-608d4793ccf8', 'Caio', 'Buteri', '123456789', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO producer (id, "firstName", "lastName", document, "createdAt", "updatedAt", "deletedAt") VALUES
    // ('bedb0b55-2560-44b2-8a8b-f9648486a51f', 'Vitor', 'Rodrigues', '987654321', NOW(), NOW(), NULL)`);
    //     // Insert farms
    //     await queryRunner.query(`INSERT INTO farm (id, name, city, state, "totalArea", "cultivableArea", "vegetationArea", "producerId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('ae405376-660a-4810-ab07-64a96c4b38b0', 'Fazenda Encatada', 'Campinas', 'ES', 100, 60, 30, '5811c149-c7c4-4389-8eef-322bed1434dc', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO farm (id, name, city, state, "totalArea", "cultivableArea", "vegetationArea", "producerId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('7714460e-ada0-456e-bf28-6ed8516f801f', 'Cantinho Feliz', 'Sao Paulo', 'SP', 110, 65, 35, '5811c149-c7c4-4389-8eef-322bed1434dc', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO farm (id, name, city, state, "totalArea", "cultivableArea", "vegetationArea", "producerId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('4d84bb62-5a8a-4fa4-984e-076cf5072acc', 'Pedra Azul', 'Mantena', 'MG', 100, 60, 30, 'c3c23488-9cc3-4833-ae53-608d4793ccf8', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO farm (id, name, city, state, "totalArea", "cultivableArea", "vegetationArea", "producerId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('a66a53eb-b4e5-4c14-8442-3aa9b96f00ed', 'Agua Corrente', 'Vitória', 'ES', 110, 65, 35, 'c3c23488-9cc3-4833-ae53-608d4793ccf8', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO farm (id, name, city, state, "totalArea", "cultivableArea", "vegetationArea", "producerId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('ea69b191-4de3-4f3e-b5b5-23b72c080ce0', 'Sol Nascente', 'São Bento', 'ES', 100, 60, 30, 'bedb0b55-2560-44b2-8a8b-f9648486a51f', NOW(), NOW(), NULL)`);
    //     // Insert harvests
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('d94865a8-ce3c-4b23-81f3-d09f4528abd7', 2022, 'ae405376-660a-4810-ab07-64a96c4b38b0', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('450cc6ac-ef6c-4275-adb5-d11bb7214ab9', 2023, 'ae405376-660a-4810-ab07-64a96c4b38b0', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('de654087-5986-4706-a03b-3122463ad43e', 2024, 'ae405376-660a-4810-ab07-64a96c4b38b0', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('cbd7211d-1128-4274-9eae-51ddfbaab9c3', 2022, '7714460e-ada0-456e-bf28-6ed8516f801f', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('c7507b59-4673-452f-9cca-a8d7a635a7bb', 2023, '7714460e-ada0-456e-bf28-6ed8516f801f', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('0c6ce835-d925-4514-b39c-fe99050f1c6f', 2024, '7714460e-ada0-456e-bf28-6ed8516f801f', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('80d14f7d-4ada-42ec-9109-0d26df78854b', 2022, '4d84bb62-5a8a-4fa4-984e-076cf5072acc', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('d7969f94-2fad-44fb-a090-1a9038f6869d', 2023, '4d84bb62-5a8a-4fa4-984e-076cf5072acc', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('2c0311c4-588c-444b-9c83-6f71f461edd4', 2024, '4d84bb62-5a8a-4fa4-984e-076cf5072acc', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('99ebea98-78b4-4bb0-891b-4999e0fa3152', 2022, 'a66a53eb-b4e5-4c14-8442-3aa9b96f00ed', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('6d6a7610-5c11-4600-8cc1-905a4020d2d3', 2023, 'a66a53eb-b4e5-4c14-8442-3aa9b96f00ed', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('42737cb3-07f1-4188-925e-7cd0bede0bc4', 2024, 'a66a53eb-b4e5-4c14-8442-3aa9b96f00ed', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('d85edfd3-1533-4b51-966d-2a8bbeac499f', 2022, 'ea69b191-4de3-4f3e-b5b5-23b72c080ce0', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('2fb20dc0-208a-448d-88f0-cdcfabd659dd', 2023, 'ea69b191-4de3-4f3e-b5b5-23b72c080ce0', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO harvest (id, year, "farmId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('43b9fba4-261f-431b-aaeb-466d37855662', 2024, 'ea69b191-4de3-4f3e-b5b5-23b72c080ce0', NOW(), NOW(), NULL)`);
    //     // Insert crops
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('d087aa19-9543-4fb0-bf8a-4ee5a1eda24a', 'Feijão', 'd94865a8-ce3c-4b23-81f3-d09f4528abd7', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('87c1519a-1ca4-41b7-838f-c92f6a79b1dc', 'Beterraba', 'd94865a8-ce3c-4b23-81f3-d09f4528abd7', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('0b6fb226-c905-4a25-b6d0-c17fce694388', 'Algodão', '450cc6ac-ef6c-4275-adb5-d11bb7214ab9', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('c0a40c24-5c62-42d5-98fc-891d5eec1454', 'Soja', '450cc6ac-ef6c-4275-adb5-d11bb7214ab9', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('ef86a648-4b43-4f1e-8f82-7b9f43de7244', 'Café', 'de654087-5986-4706-a03b-3122463ad43e', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('e9000b35-fd88-452d-b2b8-eb9bfa753e5a', 'Limão', 'de654087-5986-4706-a03b-3122463ad43e', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('eb0568d7-bcce-4cdb-9b8f-6af515cb8cbc', 'Feijão', 'cbd7211d-1128-4274-9eae-51ddfbaab9c3', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('6b6b5da6-7240-4591-886e-7987c33570f0', 'Beterraba', 'cbd7211d-1128-4274-9eae-51ddfbaab9c3', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('3220654f-e433-4ec9-8ab0-5003c2b9bf30', 'Algodão', 'c7507b59-4673-452f-9cca-a8d7a635a7bb', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('d06991b4-5ca8-4903-94d9-f83e15eab641', 'Soja', 'c7507b59-4673-452f-9cca-a8d7a635a7bb', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('4bc2d8dd-8587-410d-9eb3-8cb4bf94f23d', 'Café', '0c6ce835-d925-4514-b39c-fe99050f1c6f', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('4ed9a9ae-cdaa-4508-9101-3daa69ac3a63', 'Limão', '0c6ce835-d925-4514-b39c-fe99050f1c6f', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('11b636df-aa5b-4bec-bad8-3af4ad77a7b7', 'Feijão', '80d14f7d-4ada-42ec-9109-0d26df78854b', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('6e5fa1b5-274a-4074-ac92-f4900d21de4e', 'Beterraba', '80d14f7d-4ada-42ec-9109-0d26df78854b', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('82d2f5cf-9684-41df-850d-c64f852f7705', 'Algodão', 'd7969f94-2fad-44fb-a090-1a9038f6869d', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('b677cc90-d91c-4e63-ab94-5ed303424b95', 'Soja', 'd7969f94-2fad-44fb-a090-1a9038f6869d', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('a1aad1fc-b286-4dd4-a33c-dc150c207b19', 'Café', '2c0311c4-588c-444b-9c83-6f71f461edd4', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('38b5f3e1-f5b5-46e8-9524-13fb1275f2e2', 'Limão', '2c0311c4-588c-444b-9c83-6f71f461edd4', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('d9b65d83-17de-47df-8c65-cebeb22a6ee9', 'Feijão', '99ebea98-78b4-4bb0-891b-4999e0fa3152', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('9093dae2-49cf-41cd-8012-a83d2a330e8e', 'Beterraba', '99ebea98-78b4-4bb0-891b-4999e0fa3152', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('0396e178-2384-427a-8658-f0725def45b9', 'Algodão', '6d6a7610-5c11-4600-8cc1-905a4020d2d3', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('14adc2c3-2ed0-40a5-b1f2-66c57137a38f', 'Soja', '6d6a7610-5c11-4600-8cc1-905a4020d2d3', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('70b05262-174f-4eff-af73-af8d1458e844', 'Café', '42737cb3-07f1-4188-925e-7cd0bede0bc4', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('3c0b6d9c-e883-47a6-81e4-8bcd0fac6942', 'Limão', '42737cb3-07f1-4188-925e-7cd0bede0bc4', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('a78e0f10-b9c3-43dc-ad80-a2d3937215e6', 'Feijão', 'd85edfd3-1533-4b51-966d-2a8bbeac499f', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('fa90a24a-72db-40aa-ac2d-70e8e2cd8203', 'Beterraba', 'd85edfd3-1533-4b51-966d-2a8bbeac499f', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('7bece395-9d8e-44b2-9411-c07d4638ae26', 'Algodão', '2fb20dc0-208a-448d-88f0-cdcfabd659dd', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('999460d7-f5f1-4a80-9cc0-6025b904f0b3', 'Soja', '2fb20dc0-208a-448d-88f0-cdcfabd659dd', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('f1590392-7920-4184-a238-2b438d58190d', 'Café', '43b9fba4-261f-431b-aaeb-466d37855662', NOW(), NOW(), NULL)`);
    //     await queryRunner.query(`INSERT INTO crop (id, name, "harvestId", "createdAt", "updatedAt", "deletedAt") VALUES
    // ('e387b7c7-2111-4e61-b381-fe16b8772e55', 'Limão', '43b9fba4-261f-431b-aaeb-466d37855662', NOW(), NOW(), NULL)`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}

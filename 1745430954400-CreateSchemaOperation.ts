import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSchemaOperation1745430954400 implements MigrationInterface {
    name = 'CreateSchemaOperation1745430954400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_96b8d8d65eddaa54e4719c7134"`);
        await queryRunner.query(`CREATE TABLE "schema_operation" ("id" integer PRIMARY KEY NOT NULL)`);
        await queryRunner.query(`CREATE INDEX "IDX_2ebec5feac6637031d33506e6a" ON "operation_two" ("stateDate") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_2ebec5feac6637031d33506e6a"`);
        await queryRunner.query(`DROP TABLE "schema_operation"`);
        await queryRunner.query(`CREATE INDEX "IDX_96b8d8d65eddaa54e4719c7134" ON "operation_two" ("stateDate", "stateOther") `);
    }

}

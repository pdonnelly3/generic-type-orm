import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1745347590314 implements MigrationInterface {
    name = 'Init1745347590314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "operation_one" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" integer NOT NULL, "updatedAt" text NOT NULL, "stateValue" integer NOT NULL)`);
        await queryRunner.query(`CREATE INDEX "IDX_0cd2bfb17a5289a959569ecbd3" ON "operation_one" ("stateValue") `);
        await queryRunner.query(`CREATE TABLE "operation_two" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" integer NOT NULL, "updatedAt" text NOT NULL, "stateDate" date NOT NULL, "stateOther" text NOT NULL)`);
        await queryRunner.query(`CREATE INDEX "IDX_96b8d8d65eddaa54e4719c7134" ON "operation_two" ("stateDate", "stateOther") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_96b8d8d65eddaa54e4719c7134"`);
        await queryRunner.query(`DROP TABLE "operation_two"`);
        await queryRunner.query(`DROP INDEX "IDX_0cd2bfb17a5289a959569ecbd3"`);
        await queryRunner.query(`DROP TABLE "operation_one"`);
    }

}

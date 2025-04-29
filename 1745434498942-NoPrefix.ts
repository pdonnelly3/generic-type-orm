import { MigrationInterface, QueryRunner } from "typeorm";

export class NoPrefix1745434498942 implements MigrationInterface {
    name = 'NoPrefix1745434498942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_0cd2bfb17a5289a959569ecbd3"`);
        await queryRunner.query(`DROP INDEX "IDX_96b8d8d65eddaa54e4719c7134"`);
        await queryRunner.query(`CREATE TABLE "temporary_operation_one" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" integer NOT NULL, "updatedAt" text NOT NULL, "value" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_operation_one"("id", "status", "updatedAt", "value") SELECT "id", "status", "updatedAt", "stateValue" FROM "operation_one"`);
        await queryRunner.query(`DROP TABLE "operation_one"`);
        await queryRunner.query(`ALTER TABLE "temporary_operation_one" RENAME TO "operation_one"`);
        await queryRunner.query(`CREATE TABLE "schema_operation" ("id" integer PRIMARY KEY NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_operation_two" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" integer NOT NULL, "updatedAt" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_operation_two"("id", "status", "updatedAt") SELECT "id", "status", "updatedAt" FROM "operation_two"`);
        await queryRunner.query(`DROP TABLE "operation_two"`);
        await queryRunner.query(`ALTER TABLE "temporary_operation_two" RENAME TO "operation_two"`);
        await queryRunner.query(`CREATE TABLE "temporary_operation_two" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" integer NOT NULL, "updatedAt" text NOT NULL, "date" date NOT NULL, "other" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_operation_two"("id", "status", "updatedAt") SELECT "id", "status", "updatedAt" FROM "operation_two"`);
        await queryRunner.query(`DROP TABLE "operation_two"`);
        await queryRunner.query(`ALTER TABLE "temporary_operation_two" RENAME TO "operation_two"`);
        await queryRunner.query(`CREATE INDEX "IDX_9fab442d4d9c418f957e363cf4" ON "operation_one" ("value") `);
        await queryRunner.query(`CREATE INDEX "IDX_1e7b3695dbce01757b0d36351f" ON "operation_two" ("date") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_1e7b3695dbce01757b0d36351f"`);
        await queryRunner.query(`DROP INDEX "IDX_9fab442d4d9c418f957e363cf4"`);
        await queryRunner.query(`ALTER TABLE "operation_two" RENAME TO "temporary_operation_two"`);
        await queryRunner.query(`CREATE TABLE "operation_two" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" integer NOT NULL, "updatedAt" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "operation_two"("id", "status", "updatedAt") SELECT "id", "status", "updatedAt" FROM "temporary_operation_two"`);
        await queryRunner.query(`DROP TABLE "temporary_operation_two"`);
        await queryRunner.query(`ALTER TABLE "operation_two" RENAME TO "temporary_operation_two"`);
        await queryRunner.query(`CREATE TABLE "operation_two" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" integer NOT NULL, "updatedAt" text NOT NULL, "stateDate" date NOT NULL, "stateOther" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "operation_two"("id", "status", "updatedAt") SELECT "id", "status", "updatedAt" FROM "temporary_operation_two"`);
        await queryRunner.query(`DROP TABLE "temporary_operation_two"`);
        await queryRunner.query(`DROP TABLE "schema_operation"`);
        await queryRunner.query(`ALTER TABLE "operation_one" RENAME TO "temporary_operation_one"`);
        await queryRunner.query(`CREATE TABLE "operation_one" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" integer NOT NULL, "updatedAt" text NOT NULL, "stateValue" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "operation_one"("id", "status", "updatedAt", "stateValue") SELECT "id", "status", "updatedAt", "value" FROM "temporary_operation_one"`);
        await queryRunner.query(`DROP TABLE "temporary_operation_one"`);
        await queryRunner.query(`CREATE INDEX "IDX_96b8d8d65eddaa54e4719c7134" ON "operation_two" ("stateDate", "stateOther") `);
        await queryRunner.query(`CREATE INDEX "IDX_0cd2bfb17a5289a959569ecbd3" ON "operation_one" ("stateValue") `);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIndex1745347732237 implements MigrationInterface {
    name = 'UpdateIndex1745347732237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_96b8d8d65eddaa54e4719c7134"`);
        await queryRunner.query(`CREATE INDEX "IDX_2ebec5feac6637031d33506e6a" ON "operation_two" ("stateDate") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_2ebec5feac6637031d33506e6a"`);
        await queryRunner.query(`CREATE INDEX "IDX_96b8d8d65eddaa54e4719c7134" ON "operation_two" ("stateDate", "stateOther") `);
    }

}

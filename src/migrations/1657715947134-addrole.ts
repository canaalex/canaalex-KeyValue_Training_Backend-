import {MigrationInterface, QueryRunner} from "typeorm";

export class addrole1657715947134 implements MigrationInterface {
    name = 'addrole1657715947134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
    }

}

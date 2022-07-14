import {MigrationInterface, QueryRunner} from "typeorm";

export class employee1657697566582 implements MigrationInterface {
    name = 'employee1657697566582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employeeAdress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "adress" character varying NOT NULL, CONSTRAINT "PK_199a76c013d6d995a54c73b1a64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employeeadress_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employeeaddress_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_0473e84dc9444d9aadd3c33e707" UNIQUE ("employeeaddress_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_0473e84dc9444d9aadd3c33e707" FOREIGN KEY ("employeeaddress_id") REFERENCES "employeeAdress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_0473e84dc9444d9aadd3c33e707"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_0473e84dc9444d9aadd3c33e707"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employeeaddress_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employeeadress_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
        await queryRunner.query(`DROP TABLE "employeeAdress"`);
    }

}

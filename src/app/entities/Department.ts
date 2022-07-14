import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";

@Entity("department")
    export class Department extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
    
        @Column({ nullable: false })
        public name: string;
}
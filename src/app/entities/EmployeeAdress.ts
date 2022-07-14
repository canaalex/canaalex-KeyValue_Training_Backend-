import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Department } from "./Department";

@Entity("employeeAdress")
export class EmployeeAdress extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public adress: string;
   
  

}
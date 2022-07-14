import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Department } from "./Department";
import { EmployeeAdress } from "./EmployeeAdress";

@Entity("employee")
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public name: string;

    @Column({ nullable: false })
    public departmentId: string;

    @Column({ nullable: false })
    public age: number;

    @Column({ nullable: true })
    public role: string;
    @Column({ nullable: false })
    public password: string;

    @ManyToOne(() => Department, { cascade: true })
    @JoinColumn()
    public department: Department;

    @OneToOne(() => EmployeeAdress, { cascade: true })
    @JoinColumn()
    public employeeaddress: EmployeeAdress;

    @Column({ nullable: false })
    public employeeaddressID: string;

}

// {
    
//     "name" : "Hen",
//     "password" : "6789",
//     "departmentId":"995ac6ce-ed90-408a-adb5-c49d8d7d7241",
//     "age": 56,
//     "role": "admin",
//     "employeeaddressID":"3049bdb2-c05f-4b6f-a99f-d62819029ede"
//     $2b$10$nvdnbWOJM9la2Eenar6QJuJtw3V5nyZtsyLZXCys1JCH2kXRnHmLq
//     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b206aWQiOiJiMGU2Mjg0Yy0zYjNlLTQ4MDgtOWE3Ny0zZmI3Mjg0NjM0NWUiLCJjdXN0b206bmFtZSI6IkhlbiIsImN1c3RvbTpyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTc3OTA2NjQsImV4cCI6MTY1Nzc5NDI2NH0.PzsyoWrTyLcqsuk-2vEE-jklbaF1JCaeZl5tRDj85XM
    

// }

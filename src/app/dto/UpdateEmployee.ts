import { IsNumber, IsString } from "class-validator";

export class UpdateEmployeeDto {
    @IsString()
    public name: string;
    @IsString()
    public id: string;

    @IsNumber()
    public age: number;

    @IsString()
    public departmentId: string;

    @IsString()
    public employeeaddressID: string;

    @IsString()
    public password: string;

    @IsString()
    public role: string;

  static APP_CONSTANTS: any;
}
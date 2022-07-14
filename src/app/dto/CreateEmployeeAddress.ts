import { IsNumber, IsString } from "class-validator";

export class CreateEmployeeAddressDto {
    @IsString()
    public name: string;

    @IsNumber()
    public age: number;

    @IsString()
    public departmentId: string;

    @IsString()
    public password: string;

    @IsString()
    public role: string;
    @IsString()
    public adress: string;

  static APP_CONSTANTS: any;
}
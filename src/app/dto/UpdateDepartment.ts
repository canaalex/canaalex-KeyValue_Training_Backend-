import { IsNumber, IsString } from "class-validator";

export class UpdateDepartmentDto {
    
    @IsString()
    public name: string;
    @IsString()
    public id: string;

  static APP_CONSTANTS: any;
}
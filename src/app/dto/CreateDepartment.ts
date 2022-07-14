import { IsNumber, IsString } from "class-validator";

export class CreateDepartmentDto {
    
    @IsString()
    public name: string;

  static APP_CONSTANTS: any;
}
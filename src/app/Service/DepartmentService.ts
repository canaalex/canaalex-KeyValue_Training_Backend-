import { Department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { DepartmentRespository } from "../repository/DepartmentRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import { plainToClass } from "class-transformer";
import HttpException from "../exception/HttpException";
import { UpdateDepartmentDto } from "../dto/UpdateDepartment";

export class DepartmentService{
    
   
    constructor(private departmentRepo: DepartmentRespository){}
    async getalldepartment(){
        return this.departmentRepo.getAllDepartments();
    }
    async addDepartment(){
        return this.departmentRepo.addDepartments();
    }
    async getbyID(id:string){
        const result= await this.departmentRepo.getbyID(id);
        if(!result)
        {
           throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND)
        }
        return result
           }  
           async updatebyID(emp:UpdateDepartmentDto){
            // return await this.employeerepo.updatebyID(emp);
             try{
               const newEmployee = plainToClass(Department,{
                 name: emp.name,
                 id: emp.id,
                



               });
               const result = await this.departmentRepo.getbyID(newEmployee.id);
               if(!result)
               {
                 throw new EntityNotFoundException ( ErrorCodes.USER_WITH_ID_NOT_FOUND)
               }
               const save = await this.departmentRepo.updatebyID(newEmployee);
               return save
             }
             
               catch (err) {
               throw new HttpException(400, "Failed to create department","failed");
           }
         }    
    async deletebyID(id:string){
        return await this.departmentRepo.deletebyID(id);
        }  
      
    public async createDept(employeeDetails: any) {
            try {
                const newDept = plainToClass(Department, {
                    name: employeeDetails.name,
                    password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
                    age: employeeDetails.age,
                    departmentId: employeeDetails.departmentId,
                    employeeaddressID:employeeDetails.employeeaddressID,
                    
                });
                const save = await this.departmentRepo.createDept(newDept);
                return save;
            } catch (err) {
                throw new HttpException(400, "Failed to create employee","failed");
        }
    }
}
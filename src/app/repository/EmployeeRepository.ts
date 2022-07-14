import { plainToClass } from "class-transformer";
import { getConnection } from "typeorm";
import { CreateEmployeeDto } from "../dto/CreateEmployeedto";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    async getEmployeeByName(name:string){
        const employeeRepo = getConnection().getRepository(Employee);
    const employee = await employeeRepo.findOne( {
        where:{name: name}})
        return employee
        
    }
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({relations:["department"]});
    }
    async createEmployees(emp:Employee){
        // const empl = plainToClass(Employee,{
        //     name:emp.name,
        //     age:emp.age,
        //     departmentID:emp.departmentId,
        //     employeeaddressID:emp.employeeaddressID,
        //     password:emp.password
        // })
        const employeeRepo = getConnection().getRepository(Employee);
        const employee = await employeeRepo.save(emp)
        return employee
   }
   async createEmployeeAddress(emp:Employee){
    // const empl = plainToClass(Employee,{
    //     name:emp.name,
    //     age:emp.age,
    //     departmentID:emp.departmentId,
    //     employeeaddressID:emp.employeeaddressID,
    //     password:emp.password
    // })
    const employeeRepo = getConnection().getRepository(Employee);
    const employee = await employeeRepo.save(emp)
    return employee
}
   async getbyID(id:string){
        
    const employeeRepo = getConnection().getRepository(Employee);
    const employee = await employeeRepo.findOne(id)
    return employee
    


}
async updatebyID(emp:any){
        
    const employeeRepo = getConnection().getRepository(Employee);
    const employee = await employeeRepo.findOne({ id: emp.id})
    employee.name=emp.name
    const empl = await employeeRepo.save(emp)
    return empl
}
async deletebyID(id:string){
        
    const employeeRepo = getConnection().getRepository(Employee);
    const employee = await employeeRepo.findOne( {
        where:{id: id}})

    return await employeeRepo.remove(employee)

}
    }

    
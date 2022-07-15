import { getConnection } from "typeorm";
import { Department } from "../entities/Department";
import { Employee } from "../entities/Employee";

export class DepartmentRespository{
    
    async getAllDepartments(){
         const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find();
    }
    async getbyID(id:string){
        
        const departmentRepo = getConnection().getRepository(Department);
        const employee = await departmentRepo.findOne(id)
        return employee}
    async addDepartments(){
        const departmentRepo = getConnection().getRepository(Department);
       return await departmentRepo.insert({
        name:"frontend"
       });
   }
   async updatebyID(dept:Department){
        
    const departmentRepo = getConnection().getRepository(Department);
    const employee = await departmentRepo.findOne({ id: dept.id})
    employee.name=dept.name
    const empl = await departmentRepo.save(dept)
    return empl
}
async deletebyID(id:string){
        
    const departmentRepo = getConnection().getRepository(Department);
    const employee = await departmentRepo.findOne( {
        where:{id: id}})

    return await departmentRepo.remove(employee)

}
async createDept(emp:Department){
    // const empl = plainToClass(Employee,{
    //     name:emp.name,
    //     age:emp.age,
    //     departmentID:emp.departmentId,
    //     employeeaddressID:emp.employeeaddressID,
    //     password:emp.password
    // })
    const departmentRepo = getConnection().getRepository(Department);
    const department = await departmentRepo.save(emp)
    return department
}
    }
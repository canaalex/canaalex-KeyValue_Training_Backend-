import { plainToClass } from "class-transformer";
import { Code, getConnection } from "typeorm";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import JsonWebToken from "jsonwebtoken";
import { EmployeeAdress } from "../entities/EmployeeAdress";
import { UpdateDepartmentDto } from "../dto/UpdateDepartment";
import { Department } from "../entities/Department";
import { UpdateEmployeeDto } from "../dto/UpdateEmployee";


export class EmployeeService{
    constructor(private employeerepo: EmployeeRespository){}
    async getallemployees(){
        return this.employeerepo.getAllEmployees();
        }



        public async postallemployeeadress(employeeDetails: any) {
          try {
              const newAddress = plainToClass(EmployeeAdress, {
                  adress:employeeDetails.adress
                  
              });
              // const newAddressrepo=getConnection().getRepository(EmployeeAdress);
              // const adress= await newAddressrepo.save(newAddress);
              const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
                age: employeeDetails.age,
                departmentId: employeeDetails.departmentId,
                employeeaddress:newAddress,
                role: employeeDetails.role
                
            });
              const save = await this.employeerepo.createEmployeeAddress(newEmployee);


              return save;
          } catch (err) {
              throw new HttpException(400, "Failed to create employee","failed");
          }
      }


    
         public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
                age: employeeDetails.age,
                departmentId: employeeDetails.departmentId,
                employeeaddressID:employeeDetails.employeeaddressID,
                role: employeeDetails.role
                
            });
            const save = await this.employeerepo.createEmployees(newEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee","failed");
        }
    }
        // async postallemployees(emp:any){
        //     return await this.employeerepo.createEmployees(emp);
        //     }
            async getbyID(id:string){
             const result= await this.employeerepo.getbyID(id);
             if(!result)
             {
                throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND)
             }
                }    


                async updatebyID(emp:UpdateEmployeeDto){
                   // return await this.employeerepo.updatebyID(emp);
                    try{
                      const newEmployee = plainToClass(Employee,{
                        name: emp.name,
                        id: emp.id,
                        password: emp.password ?  await bcrypt.hash(emp.password, 10): '',
                        age:emp.age,
                        departmentId:emp.departmentId,
                        employeeaddressID:emp.employeeaddressID



                      });
                      const result = await this.employeerepo.getbyID(newEmployee.id);
                      if(!result)
                      {
                        throw new EntityNotFoundException ( ErrorCodes.USER_WITH_ID_NOT_FOUND)
                      }
                      const save = await this.employeerepo.updatebyID(newEmployee);
                      return save
                    }
                    
                      catch (err) {
                      throw new HttpException(400, "Failed to create employee","failed");
                  }
                }


                    async deletebyID(id:string){
                        return await this.employeerepo.deletebyID(id);
                        }  
                        
                        public employeeLogin = async (
                            name: string,
                            password: string
                          ) => {
                            const employeeDetails = await this.employeerepo.getEmployeeByName(
                              name
                            );
                            if (!employeeDetails) {
                              throw new UserNotAuthorizedException();
                            }
                            const validPassword = await bcrypt.compare(password, employeeDetails.password);
                            if (validPassword) {
                              let payload = {
                                "custom:id": employeeDetails.id,
                                "custom:name": employeeDetails.name,
                                "custom:role": employeeDetails.role,
                              };
                              const token = this.generateAuthTokens(payload);
                    
                              return {
                                idToken: token,
                                employeeDetails,
                              };
                            } else {
                              throw new IncorrectUsernameOrPasswordException();
                            }
                          };
                    
                         private generateAuthTokens = (payload: any) => {
                            return JsonWebToken.sign(payload, process.env.JWT_TOKEN_SECRET, {
                              expiresIn: process.env.ID_TOKEN_VALIDITY,
                            });
                          };  

        
        }
    
    

import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../Service/EmployeeService";
import { CreateEmployeeDto } from "../dto/CreateEmployeedto";
import validationMiddleware  from "../middleware/validationMiddleware";
import authorize from "../middleware/Authorize";
import {CreateEmployeeAddressDto }from "../dto/CreateEmployeeAddress";
import {UpdateEmployeeDto }from "../dto/UpdateEmployee";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    enum Roles{
      Admin="admin", HR="hr" , Engineer="Engineer", Manager="Manager"
        }
    this.router.get(`${this.path}`, authorize(['superadmin','admin']),this.getallemployees);
  
    this.router.post(`${this.path}`, authorize(Object.values([Roles.Admin,Roles.HR])),validationMiddleware(CreateEmployeeDto,APP_CONSTANTS.body),this.postallemployees);
    this.router.post(`${this.path}/address`, authorize(Object.values([Roles.Admin,Roles.HR])),validationMiddleware(CreateEmployeeAddressDto,APP_CONSTANTS.body),this.postallemployeeadress);
    this.router.get(`${this.path}/:id`, authorize(Object.values(Roles)),this.getbyID);
    this.router.put(`${this.path}/:id`, authorize(Object.values([Roles.Admin,Roles.HR])),validationMiddleware(UpdateEmployeeDto,APP_CONSTANTS.body),this.updatebyID);
    this.router.delete(`${this.path}/:id`, authorize(Object.values([Roles.Admin,Roles.HR])),this.deletebyID);
    this.router.post(
      `${this.path}/login`,
      this.login
    );


  }
  //03de4851-4f6c-421b-a432-d3a892ed6c15
  //03de4851-4f6c-421b-a432-d3a892ed6c15
  private getallemployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
    
      response.status(200);
      response.send(await this.employeeService.getallemployees());
    } catch (error) {
      return next(error);
    }
  }
  private postallemployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
    
      response.status(200);
      response.send(await this.employeeService.createEmployee(request.body));
    } catch (error) {
      return next(error);
    }
  }
  
  private postallemployeeadress = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
    
      response.status(200);
      response.send(await this.employeeService.postallemployeeadress(request.body));
    } catch (error) {
      return next(error);
    }
  }
  private getbyID = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
    
      response.status(200);
      response.send(await this.employeeService.getbyID(request.params.id));
    } catch (error) {
      return next(error);
    }
  }
  private updatebyID = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
    
      response.status(200);
      response.send(await this.employeeService.updatebyID(request.body));
    } catch (error) {
      return next(error);
    }
  }
  private deletebyID = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
    
      response.status(200);
      const data=await this.employeeService.deletebyID(request.params.id)
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.name,
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  };
}

export default EmployeeController;
// {
    
//   "id" : "27915ff5-491e-4e38-b537-4eedb09facf8",
//   "name": "riya",
//   "departmentId":"995ac6ce-ed90-408a-adb5-c49d8d7d7241",
//   "age":45,
//   "password":"1234",
//   "employeeadress":"hasch",
//   "role":"admin",
//   "employeeaddressID":"ba89fcde-3701-42b2-ba45-0a6414e05ea5"



// }
  
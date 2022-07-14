import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../Service/DepartmentService";
import authorize from "../middleware/Authorize";
import { CreateDepartmentDto }from "../dto/CreateDepartment";
import validationMiddleware  from "../middleware/validationMiddleware";


class DepartmentController extends AbstractController {
  constructor(private DepartmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    enum Roles{
      Admin="admin", HR="hr" , Engineer="Engineer", Manager="Manager"
        }
    this.router.get(`${this.path}`, authorize(Object.values(Roles)),this.getalldepartment);
    this.router.post(`${this.path}`, authorize(Object.values([Roles.Admin,Roles.HR])),validationMiddleware(CreateDepartmentDto,APP_CONSTANTS.body),this.createDept);
    this.router.get(`${this.path}/:id`, authorize(Object.values(Roles)),this.getbyID);
    this.router.put(`${this.path}`, authorize(Object.values([Roles.Admin,Roles.HR])),this.updatebyID);
    this.router.delete(`${this.path}/:id`, authorize(Object.values([Roles.Admin,Roles.HR])),this.deletebyID);
  }
   private getalldepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
    
      response.status(200);
      response.send(await this.DepartmentService.getalldepartment());
    } catch (error) {
      return next(error);
    }
  }
  private createDept = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
    
      response.status(200);
      response.send(await this.DepartmentService.addDepartment());
    } catch (error) {
      return next(error);
    }
  }
  private getbyID = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
    
      response.status(200);
      response.send(await this.DepartmentService.getbyID(request.params.id));
    } catch (error) {
      return next(error);
    }
  }
  private updatebyID = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
    
      response.status(200);
      response.send(await this.DepartmentService.updatebyID(request.body));
    } catch (error) {
      return next(error);
    }
  }
  private deletebyID = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
    
      response.status(200);
      const data=await this.DepartmentService.deletebyID(request.params.id)
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

}

export default DepartmentController;
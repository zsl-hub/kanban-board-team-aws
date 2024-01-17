import { ApiResponse } from "./responses";

export class ApiError extends Error {
    
    public errorCode: number
    constructor(errorCode: number, message: string){
        super();
        this.errorCode = errorCode
        this.message = message
    }

    public getApiResponse() {
        switch(this.errorCode){
            case 400: return ApiResponse.badRequest(this.message);
            case 401: return ApiResponse.unauthorized(this.message);
            case 403: return ApiResponse.forbidden(this.message);
            case 404: return ApiResponse.notFound(this.message);
        }
    }
}

import { ApiResponse } from "./responses";

export class ApiError extends Error {
    
    public statusCode: number
    constructor(statusCode: number, message: string){
        super();
        this.statusCode = statusCode
        this.message = message
    }

    public getApiResponse() {
        switch(this.statusCode){
            case 400: return ApiResponse.badRequest(this.message);
            case 401: return ApiResponse.unauthorized(this.message);
            case 403: return ApiResponse.forbidden(this.message);
            case 404: return ApiResponse.notFound(this.message);
            case 500: return ApiResponse.internalServerError(this.message);
        }
    }
}

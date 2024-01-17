export class ApiResponse {

    public static ok<T>(data : T) {
        return {
        body: JSON.stringify(data),
        statusCode: 200,
        }
    }
    public static notFound<T>(data : T) {
        return {
            body : JSON.stringify(data),
            statusCode: 404,
            }
    }
    public static badRequest<T>(data : T) {
        return {
            body : JSON.stringify(data),
            statusCode : 400
        }
    }
    public static unauthorized<T>(data : T) {
        return {
            body : JSON.stringify(data),
            statusCode : 401
        }
    }
    public static forbidden<T>(data : T) {
        return {
            body : JSON.stringify(data),
            statusCode : 403
        }
    }
}
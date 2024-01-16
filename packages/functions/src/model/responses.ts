export class ApiResponse {

    public static ok<T>(data : T) {
        return {
        body: JSON.stringify(data),
        statusCode: 200,
        }
    }
    public static not_found<T>(data : T) {
        return {
            body : JSON.stringify(data),
            statusCode: 404,
            }
    }
    public static bad_request<T>(data : T) {
        return {
            body : JSON.stringify(data),
            statusCode : 400
        }
    }
}
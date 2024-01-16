export class ApiResponse {
    public static ok<T>(data : T) {
        return {
        body: JSON.stringify(data),
        statusCode: 200,
        }
    }
    public static not_found() {
        return {
            statusCode: 404,
            }
    }
    public static bad_request() {
        return {
            body : 400,
            statusCode : 400
        }
    }
}
export class ApiResponse {

    public static ok<T>(data : T) {
        return {
        body: JSON.stringify(data),
        statusCode: 200,
        }
    }
}
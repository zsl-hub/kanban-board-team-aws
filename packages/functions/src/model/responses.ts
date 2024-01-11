export class ApiResponse {
    public static ok(data : T) {
        return {
        body: JSON.stringify(data),
        statusCode: 200,
        }
    }
}
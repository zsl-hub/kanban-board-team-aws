
export async function main() {
    const time = new Date();
    return {
        statusCode: 200,
        body: "Hello World! The time is " + time.toTimeString() + ".",
    };
}

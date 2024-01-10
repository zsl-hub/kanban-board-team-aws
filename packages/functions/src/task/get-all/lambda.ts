import internal from "stream";

interface task{
    id : number,
    name : string,
    desc : string,
    columnKey : string, 
}

export async function main() {
    const t1 : task = {
        id : 2137,
        name : "Cokolwiek",
        desc : "Opis",
        columnKey : "to-do"
    }
    return {
        statusCode: 200,
        body : JSON.stringify(t1),
    };
}
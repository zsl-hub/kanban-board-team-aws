import internal from "stream";

interface task{
    id : number,
    name : string,
    desc : string,
    columnKey : string, 
}

export async function main() {
    const tasks = {
        task1 : {
            id : 2137,
            name : "Cokolwiek",
            desc : "Opis",
            columnKey : "to-do"
        },
        task2 : {
            id : 2138,
            name : "Cokolwiek",
            desc : "Opis",
            columnKey : "done"
        },
        task3 : {
            id : 2139,
            name : "Cokolwiek",
            desc : "Opis",
            columnKey : "to-do"
        },
        task4 : {
            id : 21310,
            name : "Cokolwiek",
            desc : "Opis",
            columnKey : "done"
        },
        task5 : {
            id : 21311,
            name : "Cokolwiek",
            desc : "Opis",
            columnKey : "in-progress"
        },
    }
    
    return {
        statusCode: 200,
        body : JSON.stringify(tasks),
    };
}
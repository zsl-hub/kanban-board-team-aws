import internal from "stream";

interface task{
    id : number,
    name : string,
    desc : string,
    columnKey : string, 
}

export async function main() {
    var json_data = {
        Items:[
            {
                Id : 2137, 
                Name : "Wymyśl sobie coś",
                Desc : "Opis",
                Column_Key : "to-do",
            },
            {
                Id : 7312,
                Name : "śoc eibos lśymyW",
                Desc : "sipO",
                Column_Key : "wip",
            },
            {
                Id : 3721,
                Name : "sobie Wymyśl coś",
                Desc : "pisO",
                Column_Key : "done",
            },
            {
                Id : 2138, 
                Name : "nie Wymyśl sobie coś",
                Desc : "Opis no",
                Column_Key : "to-do",
            },
        ]
    }
    return {
        statusCode: 200,
        body : JSON.stringify(json_data),
    };
}
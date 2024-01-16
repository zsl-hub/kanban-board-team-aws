import { v4 as uuidv4 } from 'uuid';

interface TaskInterface{
    id: string,
    name: string,
    description: string,
    columnId: number, 
}

class Task implements TaskInterface{
    public id: string
    public name: string
    public description: string
    public columnId: number

    constructor(columnId: number, name: string, description: string = "", id?: string){
        this.id = id ?? uuidv4()
        this.columnId = columnId
        this.name = name
        this.description = description
    }
}

export {Task}
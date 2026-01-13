import moment from "moment"
moment.locale("es")

export type TaskStatus = "Todo" | "Doing" | "Done"

export class TaskItem {
    id!: number
    title!: string
    description!: string
    status!: TaskStatus
    dueDate!: Date
    dueDateString!: string
    isDueDate:boolean

    constructor(id:number, tile: string, description: string, dueDate: Date, status: TaskStatus = "Todo" ) {
        this.id = id;
        this.title = tile;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
        this.dueDateString = moment(dueDate).format("DD-MMM-YYYY")
        this.isDueDate = moment(dueDate).isBefore(moment(), "day")
    }
    
}
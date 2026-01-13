import moment from "moment"
moment.locale("es")

export type TaskStatus = "Todo" | "Doing" | "Done"

export class TaskItem {
    Id!: string
    Title!: string
    Description!: string
    Status!: TaskStatus
    DuedDate!: Date
    DuedDateString!: string
    IsDueDate:boolean

    constructor(id:string, tile: string, description: string, dueDate: Date, status: TaskStatus = "Todo" ) {
        this.Id = id;
        this.Title = tile;
        this.Description = description;
        this.Status = status;
        this.DuedDate = dueDate;
        this.DuedDateString = moment(dueDate).format("DD-MMM-YYYY")
        this.IsDueDate = moment(dueDate).isBefore(moment(), "day")
    }
    
}
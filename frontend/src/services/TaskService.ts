import { TaskItem } from "../models/TaskItem";
import axios, { AxiosError} from "axios";


const api = axios.create({
                    baseURL: import.meta.env.VITE_API_URL,
                    headers: {
                        "Content-Type":"application/json"
                    }
                });

api.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        if(error.response){
            console.log(error);
            switch(error.response.status){
                case 400:
                    throw new Error("Invalid data");
                case 404:
                    throw new Error("Task not found");
                case 500:
                    throw new Error("Server error");
                default:
                    throw new Error("Api error");
            }
        }
        throw new Error("Network error");
    }
)

const mapTask = (t: any): TaskItem =>
  new TaskItem(
    t.id,
    t.title,
    t.description ?? "",
    new Date(t.dueDate),
    t.status
  );

export const TaskService = {
    async getAll(): Promise<TaskItem[]> {
        const res = await api.get<TaskItem[]>("/task");        
        return res.data.map(mapTask);
    },

    async getById(id: number): Promise<TaskItem> {
        const res = await api.get<TaskItem>(`/task/${id}`);
        return mapTask(res.data);
    },

    async create(task: Omit<TaskItem, "id">): Promise<TaskItem> {
        const res = await api.post("/task",task);
        return res.data;
    },

    async update(task: TaskItem): Promise<void> {
        await api.put(`/task`, task);
    },

    async remove(id: number): Promise<void> {
        await api.delete(`/task/${id}`);
    },

    async start(id: number): Promise<void> {
        await api.put(`/task/${id}/start`);
    },

    async completed(id: number): Promise<void> {
        await api.put(`/task/${id}/complete`);
    }
}
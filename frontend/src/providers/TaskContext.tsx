import { createContext, useContext, useEffect, useState } from "react";
import { TaskService } from "../services/TaskService";
import { TaskItem } from "../models/TaskItem";
import toast from "react-hot-toast";

type TaskContextType = {
    tasks: TaskItem[],
    loading: boolean,
    error: string | null,
    isModalOpen: boolean,
    selectedTask: TaskItem | null,

    loadTasks: () => Promise<void>;
    openAddModal: () => void;
    openEditModal: (task: TaskItem) => void;
    closeModal: () => void;

    addTask: (task: Omit<TaskItem,"id">) => Promise<void>;
    updateTask: (task: TaskItem) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;

    startTask: (id: number) => Promise<void>;
    completedTask: (id: number) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children } : { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = async (action: () => Promise<void>) => {
        try {
            setLoading(true);
            setError(null);
            await action();
        }
        catch(e:any) {
            const messageError = e.message ?? "Unexpected error"
            setError(messageError);
            toast.error(messageError);
        } finally {
            setLoading(false);
        }
    };

    const loadTasks = async () => {
        execute(async () => {
            const data = await TaskService.getAll();
            setTasks(data);
        });       
    }

    useEffect(() => {
        loadTasks();
    }, []);

    const openAddModal =  () => {
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTask(null);
        setIsModalOpen(false);
    }

    const openEditModal =  (task: TaskItem) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const addTask = async (task: Omit<TaskItem,"id">) => {
        execute(async () => {
            await TaskService.create(task);
            await loadTasks();
            closeModal();
            toast.success("Task added");
        });
    };

    const updateTask = async (task: TaskItem) => {
        execute(async () => {
            await TaskService.update(task);
            await loadTasks();
            closeModal();
            toast.success("Task updated");
        });
    };

    const deleteTask = async (id: number) => {
        execute(async () => {
            await TaskService.remove(id);
            await loadTasks();
            toast.success("Task removed");
        });
    };

    const startTask = async (id: number) => {
        execute(async () => {
            await TaskService.start(id);
            await loadTasks();
            toast.success("Task started");
        });
    };

    const completedTask = async (id: number) => {
        execute(async () => {
            await TaskService.completed(id);
            await loadTasks();
            toast.success("Task completed");
        });
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                error,
                isModalOpen,
                selectedTask,
                loadTasks,
                openAddModal,
                openEditModal,
                closeModal,
                addTask,
                updateTask,
                deleteTask,
                startTask,
                completedTask
            }}
            >
                {children}
            </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const ctx = useContext(TaskContext);
    if(!ctx) throw new Error("useTasks mus be used within TaskProvider");
    return ctx;
}



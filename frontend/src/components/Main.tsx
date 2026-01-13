import { useState } from "react";
import { useTasks } from "../providers/taskContext";
import { TaskItem } from "../models/TaskItem";
import { ConfirmModal } from "./ConfirmModal";
import { Spinner } from "./Spinner";
import { ErrorBanner } from "./ErrorBanner ";
import { TaskRow } from "./Task/TaskRow";
import { TaskForm } from "./Task/TaskForm";

const columns = [
  { title: "Todo", status: "Todo" },
  { title: "Doing", status: "Doing" },
  { title: "Done", status: "Done" }
] as const;

const columnStyles = {
  Todo: "border-t-4 border-info",
  Doing: "border-t-4 border-warning",
  Done: "border-t-4 border-success"
};

export function  Main() 
{
    const { tasks, loading, error, isModalOpen, selectedTask, openEditModal, addTask, updateTask, deleteTask, startTask, completedTask, closeModal} = useTasks();
    const [taskToDelete, setTtaskToDelete ] = useState<TaskItem | null>(null);

    const handleSave = (task: any) => {
        if(selectedTask) {
            updateTask(task);
        } else {
            addTask(task);
        }
    };

    return(
        <main>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {columns.map(column => (
                <div key={column.status} className={`bg-base-200 rounded-lg p-4 ${columnStyles[column.status]} bg-white`}>                
                    <h2 className="text-lg font-semibold mb-4 text-center">
                        {column.title}
                    </h2>
                    <div className="space-y-2 flex justify-center flex-wrap">
                        {tasks
                        .filter(task => task.status === column.status)
                        .map(task => (
                            <TaskRow
                            key={task.id}
                            item={task}
                            onEdit={() => openEditModal(task)}
                            onDelete={() => setTtaskToDelete(task)}
                            onStart={() => startTask(task.id)}
                            onCompleted={() => completedTask(task.id)}
                            />
                        ))}
                    </div>
                </div>
            ))}
            </div>

            { loading && <Spinner />}

            { error && <ErrorBanner message={error} />}

            { isModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-4 rounded w-100">
                        <TaskForm
                            task={selectedTask}
                            onSave={handleSave}
                            onCancel={closeModal}
                        />
                    </div>
                </div>
            )}

            {taskToDelete && (
                <ConfirmModal 
                    title="Delete task"
                    message="Are you sure you want to delete this task?"
                    onConfirm={() => {
                        deleteTask(taskToDelete.id);
                        setTtaskToDelete(null);
                    }} 
                    onCancel={() => setTtaskToDelete(null)}
                />
            )}
        </main>

    );
}
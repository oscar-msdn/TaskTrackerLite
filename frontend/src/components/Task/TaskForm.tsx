import { useEffect, useState } from "react";
import { TaskItem } from "../../models/TaskItem";

type Props = {
  task?: TaskItem | null;
  onSave: (task: Omit<TaskItem, "Id"> | TaskItem) => void;
  onCancel: () => void;
};

export const TaskForm = ({ task, onSave, onCancel }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate.toISOString().split("T")[0]);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...(task && { id: task.id }),
      title: title,
      description: description,
      dueDate: new Date(dueDate)
    };

    onSave(payload as any);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">
        {task ? "Edit task" : "New task"}
      </h2>
      <input
        type="text"
        maxLength={30}
        className="input input-neutral w-full bg-white"
        placeholder="Title"
        value={title}
        onChange={e => {
            if (e.target.value.length <= 30) {
              setTitle(e.target.value);
            }
        }}
        required
      />

      <textarea
        className="textarea textarea-neutral w-full bg-white"
        placeholder="Description"
        maxLength={100}
        value={description}
        onChange={e => {
          if (e.target.value.length <= 100) {
            setDescription(e.target.value)
          }
        }}
      />

      <input
        type="date"
        className="input input-bordered w-full bg-white cursor-pointer"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        required
      />
     
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} title="Cancel" className="btn">
          Cancel
        </button>
        <button type="submit" title="Add" className="btn btn-primary">
          {task ? "Save": "Add"}
        </button>
      </div>
    </form>
  );
};
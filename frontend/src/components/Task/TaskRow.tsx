
import { TaskItem } from "../../models/TaskItem"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid" 

type Props = {
    item: TaskItem

    onEdit: () => void;
    onDelete: () => void;
    onStart: () => void;
    onCompleted: () => void;
}

export function  TaskRow({ item, onEdit, onDelete, onStart, onCompleted }: Props) 
{
    return(
        <div className=" w-80 shadow-xs shadow-blue-600 m-4 border-2 border-blue-300 rounded-xl">   
            <div className="flex pr-2 items-center justify-between">
                <h2 className="card-title text-xl pl-2"> 
                    <span>{item.id}</span> 
                    <span className="cursor-pointer text-left overflow-hidden text-ellipsis line-clamp-1" title={item.title}> - {item.title}</span>
                </h2> 
                <span className="p-0 flex gap-0">     
                    <button type="button" className="btn btn-ghost btn-circle hover:border-gray-200 hover:bg-gray-200 size-8" aria-label="Delete Task" title="Delete Task"
                            onClick={() => onDelete()}>
                        <TrashIcon className="w-5 h-5 text-gray-500 hover:text-red-500"  />  
                    </button>
                    <button type="button" className="btn btn-ghost btn-circle hover:border-gray-200 hover:bg-gray-200 size-8" aria-label="Edit Task" title="Edit Task"
                            onClick={() => onEdit()}>
                        <PencilSquareIcon className="w-5 h-5 text-gray-500 hover:text-blue-300"  />  
                    </button>
                </span>
            </div>
            <div>
                <div className="flex flex-col items-start p-2">                    
                    <span className="text-sm cursor-pointer text-left overflow-hidden text-ellipsis line-clamp-1" title={item.description}>{item.description}</span>
                    <span className={`text-sm ${item.isDueDate ? "text-red-500" : ""}`}>{item.dueDateString}</span>
                </div>                
                <div className="card-actions justify-around p-2 items-center">
                    {item.status === "Todo" &&(
                        <>
                            <div className="badge badge-outline">{item.status}</div>
                            <button type="button" className="btn btn-primary border-4" title="Start the task" aria-label="Start task" 
                                    onClick={() => onStart()}>Start</button> 
                        </>
                    )}
                    {item.status === "Doing" &&(
                        <>
                            <div className="badge badge-outline badge-warning">{item.status}</div>
                            <button type="button" className="btn btn-primary border-4" title="Complete task" aria-label="Complete task"
                                    onClick={() => onCompleted()}>Complete</button> 
                        </>
                    )}
                    {item.status === "Done" &&(<div className="badge badge-outline badge-success">{item.status}</div>)}
                </div>
            </div>
        </div>
    );
}
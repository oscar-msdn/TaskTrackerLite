
import { TaskItem } from "../model/Task"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid" 

type Props = {
    item: TaskItem
}

export function  Task({ item }: Props) 
{
    return(
        <div className=" w-80 shadow-xs shadow-blue-600 m-4 border-2 border-blue-300 rounded-xl">   
            <div className="flex pr-2 items-center justify-between">
                <h2 className="card-title text-xl pl-2"> 
                    <span>{item.Id}</span> 
                    <span className="cursor-pointer text-left overflow-hidden text-ellipsis line-clamp-1" title={item.Title}> - {item.Title}</span>
                </h2> 
                <span className="p-0 flex gap-0">     
                    <button className="btn btn-ghost btn-circle hover:border-gray-200 hover:bg-gray-200 size-8" aria-label="Delete Task" title="Delete Task">
                        <TrashIcon className="w-5 h-5 text-gray-500 hover:text-red-500"  />  
                    </button>
                    <button className="btn btn-ghost btn-circle hover:border-gray-200 hover:bg-gray-200 size-8" aria-label="Edit Task" title="Edit Task">
                        <PencilSquareIcon className="w-5 h-5 text-gray-500 hover:text-blue-300"  />  
                    </button>
                </span>
            </div>
            <div>
                <div className="flex flex-col items-start p-2">                    
                    <span className="text-sm cursor-pointer text-left overflow-hidden text-ellipsis line-clamp-1" title={item.Description}>{item.Description}</span>
                    <span className={`text-sm ${item.IsDueDate ? "text-red-500" : ""}`}>{item.DuedDateString}</span>
                </div>                
                <div className="card-actions justify-around p-2 items-center">
                    {item.Status === "Todo" &&(
                        <>
                            <div className="badge badge-outline">{item.Status}</div>
                            <button className="btn btn-primary border-4" title="Start the task" aria-label="Start task">Start</button> 
                        </>
                    )}
                    {item.Status === "Doing" &&(
                        <>
                            <div className="badge badge-outline badge-warning">{item.Status}</div>
                            <button className="btn btn-primary border-4" title="Complete task" aria-label="Complete task">Complete</button> 
                        </>
                    )}
                    {item.Status === "Done" &&(<div className="badge badge-outline badge-success">{item.Status}</div>)}
                </div>
            </div>
        </div>
    );
}
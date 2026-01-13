import logo from "../assets/logo.svg"
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export function  Header() 
{
    return(
        <header>
            <div className="flex p-2 border-b-blue-300 border-b-2 shadow-blue-100 shadow-sm">
                <a href="/" className="flex justify-start  items-center">
                    <img src={logo} alt="Site logo" className="size-15"/> <span className="font-bold text-5xl text-blue-500 text-shadow" title="Task Tracker Lite" aria-label="Task Tracker Lite<">Task Tracker Lite</span>
                </a>
                <nav className="flex flex-1 justify-end items-center">
                    <ul className="flex gap-4">
                        <li>Add Task
                            <button className="btn btn-ghost btn-circle hover:border-gray-200 hover:bg-gray-200" aria-label="Add task" title="Add Task">
                                <PlusCircleIcon className="size-20 text-blue-500" aria-label="Add task image"/>
                            </button>
                        </li>
                    </ul>
                </nav>
                
            </div>         
        </header>
    );
}
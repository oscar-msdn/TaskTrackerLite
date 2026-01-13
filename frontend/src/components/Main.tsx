import { taskMock } from "../mocks/TaskMock";
import { Task } from "./Task";

type Props = {

}

const taskList = taskMock;

export function  Main({}: Props) 
{
    return(
        <main>   
            {taskList.map(task => 
                        <Task key={task.Id} item={task} />
                    )}
        </main>

    );
}
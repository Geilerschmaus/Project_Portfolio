import Task from './Task.tsx';

interface TaskListProps {
  tasks: { taskName: string; taskDone: boolean }[];
  onDeleteTask: (id: number) => void;
  onChangeCompletionStatus: (id:number) => void;
  onEditTaskName: (id: number, newTaskName: string) => void;
  onReorderTasks: (indexMovedFrom: number, indexMovedTo: number) => void;

}

function TaskList({ tasks, onDeleteTask, onChangeCompletionStatus, onEditTaskName, onReorderTasks}: TaskListProps) {

  if(tasks.length === 0){
    return(
      <p>No Existing/Selected Tasks</p>
    )
  }
  else{

    return (
      
      <ul className="task-list">
        {tasks.map((task, index) => (
          <Task 
            index={index} 
            taskName={task.taskName} 
            taskDone={task.taskDone}
            onDelete={onDeleteTask} 
            onChangeCompletionStatus={onChangeCompletionStatus}
            onEditTaskName={onEditTaskName}
            onReorderTasks={onReorderTasks}
  
          />
        ))}
      </ul>
    );
  }
}

export default TaskList;

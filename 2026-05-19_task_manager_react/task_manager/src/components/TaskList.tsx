import Task from './Task.tsx';

interface TaskListProps {
  tasks: { taskName: string; taskDone: boolean }[];
  onDeleteTask: (id: number) => void;
  onChangeCompletionStatus: (id:number) => void;
  onEditTaskName: (id: number, newTaskName: string) => void;

}

function TaskList({ tasks, onDeleteTask, onChangeCompletionStatus, onEditTaskName}: TaskListProps) {
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

        />
      ))}
    </ul>
  );
}

export default TaskList;

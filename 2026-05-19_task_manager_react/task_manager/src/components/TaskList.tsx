import Task from './Task.tsx';

interface TaskListProps {
  tasks: { taskName: string; taskDone: boolean }[];
  onDeleteTask: (id: number) => void;
  onChangeCompletionStatus: (id:number) => void;

}

function TaskList({ tasks, onDeleteTask, onChangeCompletionStatus,}: TaskListProps) {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <Task 
          index={index} 
          taskName={task.taskName} 
          taskDone={task.taskDone}
          onDelete={onDeleteTask} 
          onChangeCompletionStatus={onChangeCompletionStatus}

        />
      ))}
    </ul>
  );
}

export default TaskList;

import _React from 'react';
import Task from './Task.tsx';

interface TaskListProps {
  tasks: string[];
  onDeleteTask: (id: number) => void;
}

function TaskList({ tasks, onDeleteTask }: TaskListProps) {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <Task 
          index={index} 
          taskName={task} 
          onDelete={onDeleteTask} 
        />
      ))}
    </ul>
  );
}

export default TaskList;

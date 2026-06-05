import React from 'react';

interface TaskItemProps {
  taskName: string;
  onDelete: (id: number) => void;
}

function TaskItem({ taskName, onDelete }: TaskItemProps) {
  return (
    <li className="task-item">
      <span>{taskName}</span>
      <button onClick={() => onDelete(Date.now())}>Delete</button>
    </li>
  );
}

export default TaskItem;

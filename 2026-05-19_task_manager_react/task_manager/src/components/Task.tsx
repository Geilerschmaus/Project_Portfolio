

interface TaskProps {
  taskName: string;
  onDelete: (id: number) => void;
  index: number;
}

function TaskItem({ taskName, onDelete, index }: TaskProps) {
  return (
    <li className="task-item">
      <span>{taskName}</span>
      <button type="button" onClick={() => onDelete(index)}>Delete</button>
    </li>
  );
}

export default TaskItem;



interface TaskProps {
  taskName: string;
  onDelete: (id: number) => void;
  index: number;
}

function TaskItem({ taskName, onDelete, index }: TaskProps) {
  return (
    <li className="task-item">
      <span style={{ color: 'white' }}>{taskName}</span>
      <button type="button" onClick={() => onDelete(index)}>Delete</button>
      <button type="button" onClick = {() => {}}>Complete</button>
      
    </li>
  );
}

export default TaskItem;

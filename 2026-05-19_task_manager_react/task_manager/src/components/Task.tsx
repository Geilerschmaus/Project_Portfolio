

interface TaskProps {

  taskName: string;
  taskDone: boolean;
  index: number;
  onDelete: (id: number) => void;
  onChangeCompletionStatus: (id:number) => void;

}

function TaskItem({ taskName,taskDone, onDelete, onChangeCompletionStatus, index }: TaskProps) {

  const changeStyleIfCompleted = () => {

    if(taskDone) {
      return {textDecoration: 'line-through', color: 'gray'};
    }
    else {
      return {textDecoration: 'none', color: 'white'};
    }
  }

  return (
    <li className="task-item">
      <span style={changeStyleIfCompleted()}>{taskName}</span>
      <button type="button" onClick={() => onDelete(index)}>Delete</button>
      <button type="button" onClick = {() => onChangeCompletionStatus(index)}>Complete</button>

    </li>
  );
}

export default TaskItem;

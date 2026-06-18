import { useState } from "react";


interface TaskProps {

  taskName: string;
  taskDone: boolean;
  index: number;
  onDelete: (id: number) => void;
  onChangeCompletionStatus: (id:number) => void;
  onEditTaskName: (id: number, newTaskName: string) => void;

}

function TaskItem({ taskName, taskDone, index, onDelete, onEditTaskName, onChangeCompletionStatus}: TaskProps) {

  const [editingMode, changeEditingMode] = useState<boolean>(false);

  const [newTaskName, changeTaskName] = useState<string>("");

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
      <button type="button" onClick={() => onEditTaskName(index)}>Edit</button>

    </li>
  );
}

export default TaskItem;

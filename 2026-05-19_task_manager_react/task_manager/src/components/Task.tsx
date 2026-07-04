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

  const changeButtonWhileEditing = () => {

    if(editingMode){
      return(
        "Save"
      );
    }
    else if(!editingMode){
      return(
        "Edit"
      );
    }
  }

  const switchEditingModeOnClick = () => {

    if(editingMode){
      changeEditingMode(false);
    }
    else if(!editingMode){
      changeEditingMode(true);
    }
  }
 
  return (
    <li className="task-item">
      {editingMode ? (<input type="text" placeholder="Enter new Name.." value={newTaskName} onChange={(input) => changeTaskName(input.target.value)}/>) : null}
      <span style={changeStyleIfCompleted()}>{taskName}</span>
      <button type="button" onClick={() => onDelete(index)}>Delete</button>
      <button type="button" onClick = {() => onChangeCompletionStatus(index)}>Complete</button>
      <button type="button" onClick={() => {onEditTaskName(index,newTaskName); switchEditingModeOnClick()}}>{changeButtonWhileEditing()}</button>

    </li>
  );
}

export default TaskItem;

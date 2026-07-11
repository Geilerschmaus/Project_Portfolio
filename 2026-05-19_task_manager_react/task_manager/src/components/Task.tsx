import { useState } from "react";


interface TaskProps {

  taskName: string;
  taskDone: boolean;
  index: number;
  onDelete: (id: number) => void;
  onChangeCompletionStatus: (id:number) => void;
  onEditTaskName: (id: number, newTaskName: string) => void;
  onReorderTasks: (indexMovedFrom: number, indexMovedto: number) => void;

}

function TaskItem({ taskName, taskDone, index, onDelete, onEditTaskName, onChangeCompletionStatus, onReorderTasks}: TaskProps) {

  const [editingMode, changeEditingMode] = useState<boolean>(false);

  const [newTaskName, changeTaskName] = useState<string>("");

  const [isDragging, changeIsDraggingMode] = useState<boolean>(false);

  const [isHoveringOver, changeIsHoveringOver] = useState<boolean>(false);

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
      changeTaskName(taskName);
    }
  }
 
  return (
    <li className="task-item" draggable 
    onDragStart={(event) => {event.dataTransfer.setData("movedFromIndex", String(index)); changeIsDraggingMode(true)}}
    onDragOver={(event) => {event.preventDefault(); changeIsHoveringOver(true)}}
    onDragLeave={(event) => {event.preventDefault(); changeIsHoveringOver(false)}}
    onDragEnd={() => {changeIsDraggingMode(false); changeIsHoveringOver(false)}}
    onDrop={(event) => {const indexMovedFrom = Number(event.dataTransfer.getData("movedFromIndex")); onReorderTasks(indexMovedFrom, index); changeIsDraggingMode(false); changeIsHoveringOver(false)}}
    style={{
      opacity: isDragging ? 0.3 : 1,
      backgroundColor: isHoveringOver ? "#5a6a80" : "transparent",
      border: isHoveringOver ? "2px solid #6b8cbe" : "2px solid transparent",
      cursor: isDragging ? "grabbing" : "grab",
      transition: "all 0.15s ease"
    }}
    >
      {editingMode ? (<input type="text" placeholder="Enter new Name.." value={newTaskName} onChange={(input) => changeTaskName(input.target.value)}/>) : null}
      {editingMode ? null:(<span style={changeStyleIfCompleted()}>{taskName}</span>)}
      <button type="button" onClick={() => onDelete(index)}>Delete</button>
      <button type="button" onClick = {() => onChangeCompletionStatus(index)}>Complete</button>
      <button type="button" onClick={() => {editingMode ? (onEditTaskName(index,newTaskName)):null; switchEditingModeOnClick()}}>{changeButtonWhileEditing()}</button>

    </li>
  );
}

export default TaskItem;

// import { useState } from 'react';
// import Task from './components/Task.tsx';

// function Taskcreator() {

//   const [task, setTask] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [status, setStatus] = useState<string>('');

//   return (
//     <div>
//       <input type="text"
//        value={task}
//        onChange={(task) => setTask(task.target.value)}
//        />
//       <input type="text"
//        value={description}
//        onChange={(description) => setDescription(description.target.value)}
//       />
//       <input type="text"
//        value={status}
//        onChange={(status) => setStatus(status.target.value)}
//       />
//       <button onClick={<Task></Task>}></button>
//       <p>{task}</p>
//     </div>
//   )

// }

// export default Taskcreator;

import { useState } from 'react';
// 1. The Contract: Tell TS what the parent provides
interface TaskInputProps {
  onAddTask: (newText: string) => void; 
}

function Taskcreator({ onAddTask }: TaskInputProps) {
  // 2. Local state: Only for the text in the input box
  const [inputValue, setInputValue] = useState<string>("");
  const handleAddClick = () => {
    if (inputValue.trim() !== "") {
      // 3. The Messenger: Sending the data up to the Boss
      onAddTask(inputValue); 
      setInputValue(""); // Clear the box
    }
  };
  return (
    <div className="task-input-container">
      <input 
        type="text" 
        value={inputValue} 
        onChange={(input) => setInputValue(input.target.value)} 
      />
      <button type="button" onClick={handleAddClick}>Add Task</button>
    </div>
  );
}
export default Taskcreator;
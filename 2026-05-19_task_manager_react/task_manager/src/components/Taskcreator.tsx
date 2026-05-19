import React, { useState } from 'react';

function TaskInput() {
  // 1. THE STORAGE (State)
  const [inputValue, setInputValue] = useState<string>("");
  // 2. THE BRIDGE (The Event Handler)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const textInsideInput = event.target.value;
    setInputValue(textInsideInput); 
  };
  // 3. THE MIRROR (The JSX)
  return (
    <div className="task-input-container">
      <input 
        type="text" 
        value={inputValue}        
        onChange={handleInputChange} 
      />
      <button onClick={() => console.log(inputValue)}>Add Task</button>
    </div>
  );
}
export default TaskInput;
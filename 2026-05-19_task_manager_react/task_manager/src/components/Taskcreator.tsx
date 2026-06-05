import React, { useState } from 'react';

interface TaskInputProps {
  onAddTask: (newText: string) => void;
}

function Taskcreator({ onAddTask }: TaskInputProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddClick = () => {
    if (inputValue.trim() !== "") {
      onAddTask(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="task-input-container">
      <input 
        type="text" 
        placeholder="Enter a task..."
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button onClick={handleAddClick}>Add Task</button>
    </div>
  );
}

export default Taskcreator;

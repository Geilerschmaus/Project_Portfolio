import _React, { useState } from 'react';
import HeaderMainScreen from "./components/Header.tsx";
import Taskcreator from "./components/Taskcreator.tsx";
import TaskList from "./components/TaskList.tsx";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);

  const addTaskToList = (newText: string) => {
    setTasks([...tasks, newText]);
  };

  const deleteTask = (idToRemove: number) => {
    // For simplicity, we use index as the ID
    setTasks(tasks.filter((_, index) => index !== idToRemove));
  };

  return (
    <div className="App">
      <HeaderMainScreen />
      <Taskcreator onAddTask={addTaskToList} />
      <TaskList tasks={tasks} onDeleteTask={deleteTask} />
    </div>
  );
}

export default App;

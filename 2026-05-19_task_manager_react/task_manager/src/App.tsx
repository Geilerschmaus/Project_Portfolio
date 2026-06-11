import _React, { useState } from 'react';
import HeaderMainScreen from "./components/Header.tsx";
import FooterMainScreen from "./components/Footer.tsx";
import Mainsection from "./components/Mainsection.tsx";
import Taskcreator from "./components/Taskcreator.tsx";
import TaskList from "./components/TaskList.tsx";
import "./App.css";

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
      <Mainsection>

        <Taskcreator onAddTask={addTaskToList} />
        <TaskList tasks={tasks} onDeleteTask={deleteTask} />
      </Mainsection>
      <FooterMainScreen />
    </div>
  );
}

export default App;

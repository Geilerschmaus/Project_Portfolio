import _React, { useState } from 'react';
import HeaderMainScreen from "./components/Header.tsx";
import FooterMainScreen from "./components/Footer.tsx";
import Mainsection from "./components/Mainsection.tsx";
import Taskcreator from "./components/Taskcreator.tsx";
import TaskList from "./components/TaskList.tsx";
import SelectFilter from "./components/FilterSelecter.tsx";
import FilteredTasksCount from "./components/TaskCounter.tsx"
import "./App.css";

interface Task {
  taskName: string;
  taskDone: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [filterType, setFilterType] = useState<"all" | "active" | "completed">("all");

  const addTaskToList = (newText: string) => {
    setTasks([...tasks, { taskName: newText, taskDone: false }]);
  };

  const deleteTask = (idToRemove: number) => {
    // For simplicity, we use index as the ID
    setTasks(tasks.filter((_, index) => index !== idToRemove));
  };

  const onChangeCompletionStatus = (idToChange: number) => {
    setTasks(tasks.map((task, index) => {
      if (index === idToChange) {
        return { ...task, taskDone: !task.taskDone };
      }
      return task;
    }));

  }

  const filteredTasks = tasks.filter(task => {
    if(filterType === "active") {
      return !task.taskDone;
    }
    if(filterType === "completed") {
      return task.taskDone;
    }
    return true;
  });

  const editTaskName = (idToChange: number) => {
    
  }
  return (
    <div className="App">
      <HeaderMainScreen />
      <Mainsection>

        <SelectFilter filterType={filterType} setFilterType={setFilterType} />
        <FilteredTasksCount tasks={tasks} filterType={filterType} />
        <Taskcreator onAddTask={addTaskToList} />
        <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} onChangeCompletionStatus={onChangeCompletionStatus} onEditTaskName={editTaskName} />
      </Mainsection>
      <FooterMainScreen />
    </div>
  );
}

export default App;

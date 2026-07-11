import { useState , useEffect} from 'react';
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
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return(saved ? JSON.parse(saved): []);
  });

  const [filterType, setFilterType] = useState<"all" | "active" | "completed">("all");

  useEffect( 
    () => {localStorage.setItem("tasks", JSON.stringify(tasks))},
    [tasks]
  )

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

  const editTaskName = (idToChange: number, newTaskName: string) => {
      setTasks(tasks.map((task, index) => {
        if(index === idToChange){

          return { ...task, taskName: newTaskName};
        }
        else{
          return task
        }
      }))
  }

  const reorderTasks = (indexMovedFrom : number, indexMovedTo : number) => {

    const tasksArrayCopy = [...tasks];
    const taskToMove = tasksArrayCopy.splice(indexMovedFrom,1)[0];
    tasksArrayCopy.splice(indexMovedTo, 0, taskToMove);

    setTasks(tasksArrayCopy);

  }
  
  return (
    <div className="App">
      <HeaderMainScreen />
      <Mainsection>

        <SelectFilter filterType={filterType} setFilterType={setFilterType} />
        <FilteredTasksCount tasks={tasks} filterType={filterType} />
        <Taskcreator onAddTask={addTaskToList} />
        <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} onChangeCompletionStatus={onChangeCompletionStatus} onEditTaskName={editTaskName} onReorderTasks={reorderTasks}/>
      </Mainsection>
      <FooterMainScreen />
    </div>
  );
}

export default App;

interface taskCounterProps {
    tasks: {taskName: string; taskDone: boolean}[];
    filterType: "all"|"active"|"completed";
}


function FilteredTasksCount({tasks,filterType}: taskCounterProps){

    const count = tasks.filter(task => {
        if(filterType === "active") {
          return !task.taskDone;
        }
        if(filterType === "completed") {
          return task.taskDone;
        }
        return true;
    
    }).length;

    return(
        <p>{count} selected Tasks</p>
    );
}

export default FilteredTasksCount
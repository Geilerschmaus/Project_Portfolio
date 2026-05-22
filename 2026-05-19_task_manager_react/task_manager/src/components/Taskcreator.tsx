import React, { useState } from 'react';

function Taskcreator() {

  const [task, setTask] = useState<string>('');



  return (
    <div>
      <input type="text"
       value={task}
       onChange={(task) => setTask(task.target.value)}
       />
       <button onClick={}></button>
      <p>{task}</p>
    </div>
  )

}

export default Taskcreator;
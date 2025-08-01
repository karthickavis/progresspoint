import { useCallback, useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const { state } = useContext(TaskContext);
  const [editTask, setEditTask] = useState(null);

  const handleSetEditTask=useCallback((task)=>{
setEditTask(task);
  },[])

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <TaskForm editTask={editTask} setEditTask={handleSetEditTask} />

      <h2 className="text-xl font-semibold text-center">Your Tasks</h2>

      <div className="space-y-4">
        {state.length > 0 ? (
          state.map((task) => (
            <TaskItem key={task.id} task={task} setEditTask={handleSetEditTask} />
          ))
        ) : (
          <p className="text-center text-gray-500">"No tasks yet – time to plan your day!"</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;

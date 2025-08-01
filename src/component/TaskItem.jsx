import React, { useCallback, useContext, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import { toast } from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";

const TaskItem = ({ task, setEditTask }) => {
  const { dispatch } = useContext(TaskContext);

  const handleDelete =useCallback(() => {
    dispatch({ type: "DELETE", payload: task.id });
    toast.success("Task deleted");
  },[dispatch,task.id]);

  const handleToggle = useCallback(() => {
    dispatch({ type: "TOGGLE", payload: task.id });
  },[dispatch,task.id]);

  const handleEdit=useCallback(()=>{
  setEditTask(task)
  },[setEditTask,task])

  // Calculate days left & progress
const{daysLeft,progress}=useMemo(()=>{
  const today = new Date();
  const dueDate = new Date(task.deadline);
  const createdAt = new Date(task.id);
  const totalDays = Math.ceil((dueDate - createdAt) / (1000 * 60 * 60 * 24));
  const daysPassed = Math.ceil((today - createdAt) / (1000 * 60 * 60 * 24));
  const progress = Math.min((daysPassed / totalDays) * 100, 100);
  const daysLeft = Math.max(Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)), 0);
  return {progress,daysLeft}
},[task.deadline,task.id]);

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-sm space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="w-5 h-5 accent-green-500"
          />
          <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>
            {task.title}
          </h3>
        </div>
        <div className="space-x-2">
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:underline text-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Deadline: {task.deadline} ({formatDistanceToNow(new Date(task.deadline), { addSuffix: true })})
      </p>
      <p className="text-sm text-gray-600">Days Left: {daysLeft}</p>

      <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-right text-xs text-gray-500">{Math.round(progress)}% Progress</p>
    </div>
  );
};

export default React.memo(TaskItem);

import React, { useState, useContext, useEffect,useCallback} from "react";
import { TaskContext } from "../context/TaskContext";
import { toast } from "react-hot-toast";

const TaskForm = ({ editTask, setEditTask }) => {
  const { dispatch } = useContext(TaskContext);

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  // Populate form if editing
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDeadline(editTask.deadline);
    }else {
      setTitle("");
      setDeadline("");
    }
  }, [editTask]);

  const handleSubmit =useCallback((e) => {
    e.preventDefault();

    if (!title || !deadline) {
      toast.error("Please fill all fields");
      return;
    }

    const newTask = {
      id: editTask ? editTask.id : Date.now(),
      title,
      deadline,
      completed: editTask ? editTask.completed : false,
    };

    if (editTask) {
      dispatch({ type: "EDIT", payload: newTask });
      toast.success("Task updated!");
      setEditTask(null);
    } else {
      dispatch({ type: "ADD", payload: newTask });
      toast.success("Task added!");
    }

    setTitle("");
    setDeadline("");
  },[title,deadline,editTask,dispatch,setEditTask]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white shadow-md p-5 rounded-xl mx-auto space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">
        {editTask ? "Edit Task" : "Add New Task"}
      </h2>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {editTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default React.memo(TaskForm);

import { createContext, useReducer, useEffect, useMemo } from "react";
import taskReducer from "./taskreducer";

export const TaskContext=createContext();

const initializer=()=>{
    try{
    const tasks=JSON.parse(localStorage.getItem("tasks"))
    return tasks||[];
    }catch{
        return[];
    }
}

export const TaskProvider=({children})=>{
    const [state,dispatch]=useReducer(taskReducer,[],initializer);

    useEffect(()=>{
      localStorage.setItem('tasks',JSON.stringify(state));
    },[state])

     const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
    return(
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}
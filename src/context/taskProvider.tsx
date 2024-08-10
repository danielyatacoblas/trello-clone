"use client";
import React, { useReducer } from "react";
import { taskReducer } from "./reducer";
import { Task, TaskState } from "@/interfaces/interfaces";
import { TaskContext } from "./taskContext";
import { localTasks } from "@/utils/localTasks";

const INITIAL_STATE: TaskState = localTasks();
type props = {
  children: React.ReactNode;
};
export default function TaskProvider({ children }: props) {
  const [taskState, dispatch] = useReducer(taskReducer, INITIAL_STATE);

  const createTaskList = (nameList: string) => {
    dispatch({ type: "CREATE_LIST", payload: nameList });
  };
  const deleteTaskList = (id: number) => {
    dispatch({ type: "DELETE_LIST", payload: id });
  };
  const createTask = (idList: number, newTask: Task) => {
    dispatch({
      type: "CREATE_TASK",
      payload: { idList: idList, task: newTask },
    });
  };
  const updateTask = (idList: number, id: number, newTask: Task) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: { idList: idList, id: id, task: newTask },
    });
  };
  const updateStatus = (idList: number, id: number, status: string) => {
    dispatch({
      type: "UPDATE_STATUS",
      payload: { idList: idList, id: id, status: status },
    });
  };
  const deleteTask = (idList: number, id: number) => {
    dispatch({ type: "DELETE_TASK", payload: { idList: idList, id: id } });
  };
  const replaceTaskList = (taskList: TaskState) => {
    dispatch({ type: "REPLACE", payload: taskList });
  };

  return (
    <TaskContext.Provider
      value={{
        taskState,
        createTaskList,
        deleteTaskList,
        createTask,
        updateTask,
        updateStatus,
        deleteTask,
        replaceTaskList,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

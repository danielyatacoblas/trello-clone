"use client";
import { Task, TaskState } from "@/interfaces/interfaces";
import { createContext } from "react";

type TaskStateprops = {
  taskState: TaskState;
  createTaskList: (nameList: string) => void;
  deleteTaskList: (id: string) => void;
  createTask: (idList: string, newTask: Task) => void;
  updateTask: (idList: string, id: string, newTask: Task) => void;
  updateStatus: (idList: string, id: string, status: string) => void;
  deleteTask: (idList: string, id: string) => void;
  replaceTaskList: (taskList: TaskState) => void;
};

export const TaskContext = createContext<TaskStateprops>({} as TaskStateprops);

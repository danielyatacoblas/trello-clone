"use client";
import { Task, TaskState } from "@/interfaces/interfaces";
import { createContext } from "react";

type TaskStateprops = {
  taskState: TaskState;
  createTaskList: (nameList: string) => void;
  deleteTaskList: (id: number) => void;
  createTask: (idList: number, newTask: Task) => void;
  updateTask: (idList: number, id: number, newTask: Task) => void;
  updateStatus: (idList: number, id: number, status: string) => void;
  deleteTask: (idList: number, id: number) => void;
  replaceTaskList: (taskList: TaskState) => void;
};

export const TaskContext = createContext<TaskStateprops>({} as TaskStateprops);

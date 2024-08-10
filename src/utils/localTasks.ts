import { TaskState } from "@/interfaces/interfaces";

export function localTasks(): TaskState {
  if (typeof window !== "undefined") {
    const tasksStorage = localStorage.getItem("listTasks");
    return JSON.parse(tasksStorage ?? JSON.stringify({ taskItems: [] }));
  } else {
    return { taskItems: [] };
  }
}

export function saveTasksToLocalStorage(taskState: TaskState): void {
  localStorage.setItem("listTasks", JSON.stringify(taskState));
}

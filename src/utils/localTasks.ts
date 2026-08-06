import { TaskState } from "@/interfaces/interfaces";

export function localTasks(): TaskState {
  if (typeof window !== "undefined") {
    const tasksStorage = localStorage.getItem("listTasks");
    const state: TaskState = JSON.parse(
      tasksStorage ?? JSON.stringify({ taskItems: [] })
    );
    // Normaliza los ids guardados como number en versiones anteriores
    return {
      taskItems: state.taskItems.map((list) => ({
        ...list,
        id: String(list.id),
        taskList: list.taskList.map((task) => ({
          ...task,
          id: String(task.id),
        })),
      })),
    };
  } else {
    return { taskItems: [] };
  }
}

export function saveTasksToLocalStorage(taskState: TaskState): void {
  localStorage.setItem("listTasks", JSON.stringify(taskState));
}

export type status = "process" | "completed" | "to do";

export interface Task {
  id: string;
  description: string;
  status: string;
}

export interface NameList {
  id: string;
  name: string;
  taskList: Task[];
}

export interface TaskState {
  taskItems: NameList[];
}

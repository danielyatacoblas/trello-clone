export type status = "process" | "completed" | "to do";

export interface Task {
  id: number;
  description: string;
  status: string;
}

export interface NameList {
  id: number;
  name: string;
  taskList: Task[];
}

export interface TaskState {
  taskItems: NameList[];
}

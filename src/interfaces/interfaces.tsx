export type status = "process" | "completed" | "to do";

export interface Task {
  id: number;
  description: string;
  status: string;
}

export interface NameList {
  name: string;
  taskList: Task[];
}

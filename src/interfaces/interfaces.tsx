export type status = "process" | "complete" | "to do";

export interface Task {
  id: number;
  name: string;
  status: string;
}

export interface NameList {
  name: string;
  taskList: Task[];
}

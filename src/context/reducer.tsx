import { Task, TaskState } from "@/interfaces/interfaces";

type TaskAction =
  | { type: "CREATE_LIST"; payload: string }
  | { type: "DELETE_LIST"; payload: number }
  | { type: "CREATE_TASK"; payload: { idList: number; task: Task } }
  | {
      type: "UPDATE_TASK";
      payload: { idList: number; id: number; task: Partial<Task> };
    }
  | {
      type: "UPDATE_STATUS";
      payload: { idList: number; id: number; status: string };
    }
  | { type: "DELETE_TASK"; payload: { idList: number; id: number } }
  | { type: "REPLACE"; payload: TaskState };

export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "CREATE_LIST":
      return {
        ...state,
        taskItems: [
          ...state.taskItems,
          {
            id: state.taskItems.length + 1,
            name: action.payload,
            taskList: [],
          },
        ],
      };

    case "DELETE_LIST":
      return {
        ...state,
        taskItems: state.taskItems.filter(
          (taskItems) => taskItems.id !== action.payload
        ),
      };

    case "CREATE_TASK":
      return {
        ...state,
        taskItems: state.taskItems.map((taskItems) =>
          taskItems.id === action.payload.idList
            ? {
                ...taskItems,
                taskList: [
                  ...taskItems.taskList,
                  { ...action.payload.task, id: taskItems.taskList.length + 1 },
                ],
              }
            : taskItems
        ),
      };

    case "UPDATE_TASK":
      return {
        ...state,
        taskItems: state.taskItems.map((taskItems) =>
          taskItems.id === action.payload.idList
            ? {
                ...taskItems,
                taskList: taskItems.taskList.map((task) =>
                  task.id === action.payload.id
                    ? { ...task, ...action.payload.task }
                    : task
                ),
              }
            : taskItems
        ),
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        taskItems: state.taskItems.map((taskItems) =>
          taskItems.id === action.payload.idList
            ? {
                ...taskItems,
                taskList: taskItems.taskList.map((task) =>
                  task.id === action.payload.id
                    ? { ...task, status: action.payload.status }
                    : task
                ),
              }
            : taskItems
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        taskItems: state.taskItems.map((tasks) =>
          tasks.id === action.payload.idList
            ? {
                ...tasks,
                taskList: tasks.taskList.filter(
                  (task) => task.id !== action.payload.id
                ),
              }
            : tasks
        ),
      };
    case "REPLACE":
      return action.payload;
    default:
      return state;
  }
};

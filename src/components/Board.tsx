import { NameList } from "@/interfaces/interfaces";
import TaskItems from "./Tasktems";

export default function Board() {
  const taskList: NameList[] = [
    {
      name: "Tareas 1",
      taskList: [
        {
          id: 1,
          description: "Determinar",
          status: "completed",
        },
      ],
    },
    {
      name: "Tareas 1",
      taskList: [
        {
          id: 1,
          description: "Determinar",
          status: "completed",
        },
        {
          id: 2,
          description: "Determinar",
          status: "completed",
        },
        {
          id: 3,
          description: "Determinar",
          status: "completed",
        },
        {
          id: 4,
          description: "Determinar tareas",
          status: "to do",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col justify-start items-start w-full h-auto max-h-[80vh] overflow-x-auto overflow-y-hidden">
      <div className="flex gap-2 p-1">
        {taskList.map((tasks, index) => (
          <TaskItems key={index} tasks={tasks} />
        ))}
      </div>
    </div>
  );
}

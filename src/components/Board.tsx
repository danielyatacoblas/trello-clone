import { NameList } from "@/interfaces/interfaces";
import TaskItems from "./Tasktems";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Board() {
  const taskList: NameList[] = [
    {
      name: "Tareas 1",
      taskList: [
        {
          id: 1,
          name: "Determinar",
          status: "complete",
        },
      ],
    },
    {
      name: "Tareas 1",
      taskList: [
        {
          id: 1,
          name: "Determinar",
          status: "complete",
        },
        {
          id: 2,
          name: "Determinar",
          status: "complete",
        },
        {
          id: 3,
          name: "Determinar",
          status: "complete",
        },
        {
          id: 4,
          name: "Determinar",
          status: "complete",
        },
        {
          id: 5,
          name: "Determinar",
          status: "complete",
        },
        {
          id: 6,
          name: "Determinar",
          status: "complete",
        },
        {
          id: 7,
          name: "Determinar",
          status: "complete",
        },
        {
          id: 8,
          name: "Determinar",
          status: "complete",
        },
        {
          id: 9,
          name: "Determinar",
          status: "complete",
        },
      ],
    },
  ];

  return (
    <div className="flex justify-start items-start w-full h-auto max-h-[80vh] overflow-x-auto">
      <div className="flex gap-2 p-1">
        {taskList.map((tasks, index) => (
          <TaskItems key={index} tasks={tasks} />
        ))}
      </div>
    </div>
  );
}

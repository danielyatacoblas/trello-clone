"use client";
import { NameList, Task } from "@/interfaces/interfaces";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import DialogTask from "./DialogTask";
import { DeleteTaskList } from "./DeleteTaskList";
import SortableTaskItem from "./SortableTaskItem";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type props = {
  tasks: NameList;
  visibleTasks: Task[];
};

export default function TaskItems({ tasks, visibleTasks }: props) {
  const total = tasks.taskList.length;
  const visible = visibleTasks.length;
  const { setNodeRef } = useDroppable({
    id: tasks.id,
    data: { type: "list" },
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col justify-start items-center  gap-4 p-4 min-w-[280px] h-auto min-h-[300px]  "
    >
      <span className="flex items-center font-semibold text-xl underline select-none w-full">
        <div className="flex-1 text-center">
          {tasks.name === "" ? "Sin nombre" : tasks.name}{" "}
          <span
            className="no-underline text-sm font-normal rounded-full bg-primary text-primary-foreground px-2 py-0.5 align-middle"
            title="Tarjetas en la lista"
          >
            {visible === total ? total : `${visible}/${total}`}
          </span>
        </div>
        <p className="">
          <DeleteTaskList  id={tasks.id} name={tasks.name} />
        </p>
      </span>
      <ScrollArea className="rounded-md max-h-[80vh] h-auto w-full">
        <div className="p-1 h-auto">
          <div className="flex flex-col gap-4 p-2 h-auto">
            <SortableContext
              items={visibleTasks.map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {visibleTasks.map((task) => (
                <SortableTaskItem idList={tasks.id} key={task.id} task={task} />
              ))}
            </SortableContext>
            <DialogTask
              idList={tasks.id}
              isEdit={false}
              btn={<Button>Agregar tarea</Button>}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

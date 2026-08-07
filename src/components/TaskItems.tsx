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
      className="flex h-auto w-[288px] shrink-0 flex-col gap-3 rounded-xl border border-border bg-panel/85 p-3 text-panel-foreground shadow-sm"
    >
      <header className="flex select-none items-center gap-2">
        <h2 className="flex min-w-0 flex-1 items-baseline gap-2 text-lg font-bold tracking-tight">
          <span className="truncate" title={tasks.name || "Sin nombre"}>
            {tasks.name === "" ? "Sin nombre" : tasks.name}
          </span>
          <span
            className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground"
            title="Tarjetas visibles en la lista"
          >
            {visible === total ? total : `${visible}/${total}`}
          </span>
        </h2>
        <DeleteTaskList id={tasks.id} name={tasks.name} />
      </header>
      <ScrollArea className="h-auto max-h-[70vh] w-full rounded-md">
        <div className="flex h-auto flex-col gap-3 pb-1 pr-2">
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
            btn={<Button className="w-full">Agregar tarea</Button>}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

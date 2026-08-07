"use client";
import { Task } from "@/interfaces/interfaces";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DeleteTask } from "./DeleteTask";
import DialogTask from "./DialogTask";
import useTasks from "@/hooks/useTasks";
type props = {
  idList: string;
  task: Task;
};

export default function TaskItem({ idList, task }: props) {
  const { updateStatus } = useTasks();

  const statusLabel =
    task.status === "to do"
      ? "Por hacer"
      : task.status === "completed"
      ? "Completado"
      : "En proceso";

  const currentStatus = (
    <button
      type="button"
      id="statusTooltip"
      aria-label={`Estado: ${statusLabel}. Cambiar estado`}
      title={`Estado: ${statusLabel}`}
      className={`w-4 h-4 shrink-0 rounded-full ring-1 ring-black/10 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card dark:ring-white/20 ${
        task.status === "to do"
          ? "bg-red-500"
          : task.status === "completed"
          ? "bg-green-500"
          : "bg-orange-500"
      }`}
    />
  );
  const handleStatus = (value: string) => {
    updateStatus(idList, task.id, value);
  };

  return (
    <div className="group flex w-[264px] items-start justify-between gap-3 rounded-lg border border-border bg-card p-3 text-card-foreground shadow-sm transition-shadow duration-150 hover:shadow-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-panel">
      {/*
        La tarjeta crece con su contenido: sin alto máximo el texto ya no se
        parte a media línea. Para descripciones muy largas, line-clamp corta
        en el salto de línea (con puntos suspensivos limpios) y el texto
        completo queda disponible en el title.
      */}
      <p
        title={task.description}
        className="min-w-0 flex-1 whitespace-pre-line break-words text-sm leading-snug line-clamp-6"
      >
        {task.description}
      </p>
      <div className="flex shrink-0 items-center justify-end gap-2 pt-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>{currentStatus}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={task.status}
              onValueChange={handleStatus}
            >
              <DropdownMenuRadioItem value="to do">
                Por hacer
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="process">
                En proceso
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="completed">
                Completado
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogTask
          idList={idList}
          isEdit={true}
          task={task}
          btn={
            <Button className="w-6 h-6 p-0" variant={"edit"}>
              <Pencil1Icon />
            </Button>
          }
        />
        <DeleteTask idList={idList} id={task.id} />
      </div>
    </div>
  );
}

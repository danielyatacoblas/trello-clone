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

import { useEffect, useState } from "react";
import { DeleteTask } from "./DeleteTask";
import DialogTask from "./DialogTask";
type props = {
  task: Task;
};

export default function TaskItem({ task }: props) {
  const [status, setStatus] = useState(task.status);

  const currentStatus = (
    <span
      id="statusTooltip"
      className={`w-4 h-4 rounded-full ${
        status === "to do"
          ? "bg-red-500"
          : status === "completed"
          ? "bg-green-500"
          : "bg-orange-500"
      }`}
    />
  );
  const handleStatus = (value: string) => {
    setStatus(value);
  };

  return (
    <div className="flex justify-between items-center px-1 py-2 shadow-lg rounded-lg bg-background gap-2 w-[220px] max-h-[80px] ">
      <p className="text-sm overflow-y-auto max-h-[70px] ">
        {task.description}
      </p>
      <div className="flex justify-end gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>{currentStatus}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={status} onValueChange={handleStatus}>
              <DropdownMenuRadioItem value="to do">to do</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="process">
                process
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="completed">
                completed
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogTask
          isEdit={true}
          task={task}
          btn={
            <Button className="w-6 h-6 p-0" variant={"edit"}>
              <Pencil1Icon />
            </Button>
          }
        />
        <DeleteTask id={task.id} />
      </div>
    </div>
  );
}

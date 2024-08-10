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

import { useState } from "react";
import { DeleteTask } from "./DeleteTask";
import DialogTask from "./DialogTask";
import useTasks from "@/hooks/useTasks";
type props = {
  idList: number;
  task: Task;
};

export default function TaskItem({ idList, task }: props) {
  const { updateStatus } = useTasks();

  const currentStatus = (
    <span
      id="statusTooltip"
      className={`w-4 h-4 rounded-full ${
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
    <div className="flex justify-between items-center px-1 py-2 shadow-lg rounded-lg bg-background gap-2 w-[220px] max-h-[80px] ">
      <p className="text-sm overflow-y-auto max-h-[70px] ">
        {task.description}
      </p>
      <div className="flex justify-end gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>{currentStatus}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={task.status}
              onValueChange={handleStatus}
            >
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

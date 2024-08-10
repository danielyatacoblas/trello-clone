"use client";
import { useEffect, useState } from "react";
import TaskItems from "./Tasktems";
import useTasks from "@/hooks/useTasks";
import {ReloadIcon} from "@radix-ui/react-icons"

export default function Board() {
  const { taskState } = useTasks();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true); 
  }, []);

  if (!hydrated) {
    return <div className="animate-spin"><ReloadIcon/></div>; 
  }

  return (
    <section className="flex flex-col justify-start items-start w-full h-auto max-h-[80vh] overflow-x-auto overflow-y-hidden">
      <div className="flex gap-2 p-1">
          {taskState.taskItems.map((tasks) => (
            <TaskItems key={tasks.id} tasks={tasks} />
          ))}
      </div>
    </section>
  );
}
"use client";
import TaskItems from "./Tasktems";
import useTasks from "@/hooks/useTasks";

export default function Board() {
  const { taskState } = useTasks();

  return (
    <section className="flex flex-col items-start w-full h-auto max-h-[80vh] overflow-x-auto overflow-y-hidden">
      <div className="flex gap-2 p-1">
        {taskState.taskItems.map((tasks, index) => (
          <TaskItems key={index} tasks={tasks} />
        ))}
      </div>
    </section>
  );
}

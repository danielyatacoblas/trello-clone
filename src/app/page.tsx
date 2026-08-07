"use client";
import AddListTask from "@/components/AddListTask";
import Board from "@/components/Board";
import useTasks from "@/hooks/useTasks";
export default function Home() {
  const { createTaskList } = useTasks();

  return (
    <main className="flex flex-col items-center justify-center px-4 py-6 sm:p-8 md:px-16 md:py-10">
      <div className="flex w-full items-end justify-end">
        <AddListTask createTaskList={createTaskList} />
      </div>
      <Board />
    </main>
  );
}

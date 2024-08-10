"use client";
import AddListTask from "@/components/AddListTask";
import Board from "@/components/Board";
import useTasks from "@/hooks/useTasks";
export default function Home() {
  const { createTaskList } = useTasks();

  return (
    <main className="flex flex-col justify-center items-center p-8 md:px-18 md:py-10">
      <div className="flex w-full justify-end items-end">
        <AddListTask createTaskList={createTaskList} />
      </div>
      <Board />
    </main>
  );
}

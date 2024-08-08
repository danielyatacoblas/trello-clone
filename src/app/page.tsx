import AddListTask from "@/components/AddListTask";
import Board from "@/components/Board";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center p-8 md:px-18 md:py-10">
      <div className="flex w-full justify-end items-end">
        <AddListTask />
      </div>
      <Board />
    </main>
  );
}

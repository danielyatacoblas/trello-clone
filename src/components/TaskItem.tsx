import { Task } from "@/interfaces/interfaces";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

type props = {
  task: Task;
};

export default function TaskItem({ task }: props) {
  return (
    <div className="flex justify-between px-1 py-2 shadow-lg rounded-lg bg-background">
      <p>{task.name}</p>
      <span>status</span>
      <Button variant={"destructive"}>
        <TrashIcon />
      </Button>
    </div>
  );
}

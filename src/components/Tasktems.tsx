import { NameList } from "@/interfaces/interfaces";
import TaskItem from "./TaskItem";
import { ScrollArea } from "@/components/ui/scroll-area";

type props = {
  tasks: NameList;
};

export default function TaskItems({ tasks }: props) {
  return (
    <div className="flex flex-col justify-start items-center  gap-4 p-4 min-w-[280px] h-auto min-h-[300px]  ">
      <span className="font-semibold text-xl underline">{tasks.name}</span>
      <ScrollArea className="rounded-md max-h-[80vh] h-auto ">
        <div className="p-1 h-auto">
          <div className="flex flex-col gap-4 p-2 h-auto">
            {tasks.taskList.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

import { NameList } from "@/interfaces/interfaces";
import TaskItem from "./TaskItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import DialogTask from "./DialogTask";
import { DeleteTaskList } from "./DeleteTaskList";

type props = {
  tasks: NameList;
};

export default function TaskItems({ tasks }: props) {
  return (
    <div className="flex flex-col justify-start items-center  gap-4 p-4 min-w-[280px] h-auto min-h-[300px]  ">
      <span className="flex items-center font-semibold text-xl underline select-none w-full">
        <div className="flex-1 text-center">
          {tasks.name === "" ? "No name" : tasks.name}
        </div>
        <p className="">
          <DeleteTaskList id={tasks.id} name={tasks.name} />
        </p>
      </span>
      <ScrollArea className="rounded-md max-h-[80vh] h-auto w-full">
        <div className="p-1 h-auto">
          <div className="flex flex-col gap-4 p-2 h-auto">
            {tasks.taskList.map((task) => (
              <TaskItem idList={tasks.id} key={task.id} task={task} />
            ))}
            <DialogTask
              idList={tasks.id}
              isEdit={false}
              btn={<Button>Add Task</Button>}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

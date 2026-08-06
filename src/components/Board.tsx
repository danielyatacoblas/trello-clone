"use client";
import { useEffect, useState } from "react";
import TaskItems from "./TaskItems";
import TaskItem from "./TaskItem";
import useTasks from "@/hooks/useTasks";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Task } from "@/interfaces/interfaces";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export default function Board() {
  const { taskState, replaceTaskList } = useTasks();
  const [hydrated, setHydrated] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeListId, setActiveListId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div className="animate-spin"><ReloadIcon/></div>;
  }

  // Devuelve el id de la lista que contiene la tarea, o el propio id si es una lista
  const findListId = (id: string): string | undefined => {
    if (taskState.taskItems.some((list) => list.id === id)) return id;
    return taskState.taskItems.find((list) =>
      list.taskList.some((task) => task.id === id)
    )?.id;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const id = String(event.active.id);
    const listId = findListId(id);
    const task = taskState.taskItems
      .find((list) => list.id === listId)
      ?.taskList.find((task) => task.id === id);
    setActiveTask(task ?? null);
    setActiveListId(listId ?? null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    const sourceListId = findListId(activeId);
    const targetListId = findListId(overId);

    if (!sourceListId || !targetListId || sourceListId === targetListId) {
      return;
    }

    // Mueve la tarea de una lista a otra mientras se arrastra
    const sourceList = taskState.taskItems.find(
      (list) => list.id === sourceListId
    );
    const movedTask = sourceList?.taskList.find((task) => task.id === activeId);
    if (!movedTask) return;

    replaceTaskList({
      taskItems: taskState.taskItems.map((list) => {
        if (list.id === sourceListId) {
          return {
            ...list,
            taskList: list.taskList.filter((task) => task.id !== activeId),
          };
        }
        if (list.id === targetListId) {
          const overIndex = list.taskList.findIndex(
            (task) => task.id === overId
          );
          const newTaskList = [...list.taskList];
          const insertAt = overIndex >= 0 ? overIndex : newTaskList.length;
          newTaskList.splice(insertAt, 0, movedTask);
          return { ...list, taskList: newTaskList };
        }
        return list;
      }),
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    setActiveListId(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    const listId = findListId(activeId);
    if (!listId || listId !== findListId(overId) || activeId === overId) {
      return;
    }

    // Reordena dentro de la misma lista
    replaceTaskList({
      taskItems: taskState.taskItems.map((list) => {
        if (list.id !== listId) return list;
        const oldIndex = list.taskList.findIndex(
          (task) => task.id === activeId
        );
        const newIndex = list.taskList.findIndex((task) => task.id === overId);
        if (oldIndex < 0 || newIndex < 0) return list;
        return { ...list, taskList: arrayMove(list.taskList, oldIndex, newIndex) };
      }),
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActiveTask(null);
        setActiveListId(null);
      }}
    >
      <section className="flex flex-col justify-start items-start w-full h-auto max-h-[80vh] overflow-x-auto overflow-y-hidden">
        <div className="flex gap-2 p-1">
            {taskState.taskItems.map((tasks) => (
              <TaskItems key={tasks.id} tasks={tasks} />
            ))}
        </div>
      </section>
      <DragOverlay>
        {activeTask && activeListId ? (
          <div className="rotate-3 shadow-2xl cursor-grabbing">
            <TaskItem idList={activeListId} task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

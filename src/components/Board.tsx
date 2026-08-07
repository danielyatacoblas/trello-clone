"use client";
import { useEffect, useState } from "react";
import TaskItems from "./TaskItems";
import TaskItem from "./TaskItem";
import useTasks from "@/hooks/useTasks";
import useFilters from "@/hooks/useFilters";
import { StatusFilter } from "@/context/filterContext";
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

const statusChips: { value: Exclude<StatusFilter, null>; label: string; color: string }[] = [
  { value: "to do", label: "Por hacer", color: "bg-red-500" },
  { value: "process", label: "En proceso", color: "bg-orange-500" },
  { value: "completed", label: "Completado", color: "bg-green-500" },
];

export default function Board() {
  const { taskState, replaceTaskList } = useTasks();
  const { search, statusFilter, setStatusFilter } = useFilters();
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
    return (
      <div
        role="status"
        aria-label="Cargando tablero"
        className="flex w-full justify-center py-10 text-muted-foreground"
      >
        <ReloadIcon className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  // Filtrado derivado del estado (no modifica lo persistido en localStorage)
  const matchesFilters = (task: Task): boolean => {
    const matchesSearch = task.description
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesStatus = !statusFilter || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  };

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
      <div className="flex flex-wrap items-center gap-2 w-full py-3">
        {statusChips.map((chip) => (
          <button
            key={chip.value}
            type="button"
            onClick={() =>
              setStatusFilter(statusFilter === chip.value ? null : chip.value)
            }
            aria-pressed={statusFilter === chip.value}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              statusFilter === chip.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ring-1 ring-black/10 dark:ring-white/20 ${chip.color}`}
            />
            {chip.label}
          </button>
        ))}
      </div>
      <section className="flex h-auto max-h-[80vh] w-full flex-col items-start justify-start overflow-x-auto overflow-y-hidden pb-2">
        <div className="flex items-start gap-4 p-1">
            {taskState.taskItems.map((tasks) => (
              <TaskItems
                key={tasks.id}
                tasks={tasks}
                visibleTasks={tasks.taskList.filter(matchesFilters)}
              />
            ))}
        </div>
      </section>
      <DragOverlay>
        {activeTask && activeListId ? (
          <div className="w-[264px] rotate-3 cursor-grabbing rounded-lg shadow-2xl">
            <TaskItem idList={activeListId} task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

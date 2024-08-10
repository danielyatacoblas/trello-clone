"use client";
import { TaskContext } from "@/context/taskContext";
import { useContext } from "react";

export default function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks debe ser usado dentro de TaskProvider");
  }
  return context;
}

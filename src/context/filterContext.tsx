"use client";
import { createContext } from "react";

export type StatusFilter = "to do" | "process" | "completed" | null;

type FilterStateProps = {
  search: string;
  setSearch: (search: string) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
};

export const FilterContext = createContext<FilterStateProps>(
  {} as FilterStateProps
);

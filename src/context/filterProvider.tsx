"use client";
import React, { useState } from "react";
import { FilterContext, StatusFilter } from "./filterContext";

type props = {
  children: React.ReactNode;
};

export default function FilterProvider({ children }: props) {
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(null);

  return (
    <FilterContext.Provider
      value={{ search, setSearch, statusFilter, setStatusFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
}

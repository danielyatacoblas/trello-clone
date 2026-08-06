"use client";
import { FilterContext } from "@/context/filterContext";
import { useContext } from "react";

export default function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters debe ser usado dentro de FilterProvider");
  }
  return context;
}

"use client";
import { ModeToggle } from "./mode-toggle";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import useFilters from "@/hooks/useFilters";

export default function Navbar() {
  const { search, setSearch } = useFilters();

  return (
    <nav className="sticky top-0 right-0 left-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-card/90 px-6 py-4 text-card-foreground shadow-sm backdrop-blur-md sm:px-12">
      <h1 className="text-2xl font-bold tracking-tight">TaskList</h1>
      <div className="flex items-center gap-6 sm:gap-8">
        <div className="relative w-[180px] sm:w-[260px]">
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tarjetas..."
            className="border-border bg-background pl-8"
            aria-label="Buscar tarjetas"
          />
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}

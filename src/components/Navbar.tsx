"use client";
import { ModeToggle } from "./mode-toggle";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import useFilters from "@/hooks/useFilters";

export default function Navbar() {
  const { search, setSearch } = useFilters();

  return (
    <nav className="sticky right-0 left-0 flex items-center justify-between gap-4 px-12 py-4 shadow-2xl">
      <h2 className="text-2xl font-semibold">TaskList</h2>
      <div className="flex items-center gap-8">
        <div className="relative w-[180px] sm:w-[260px]">
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tarjetas..."
            className="pl-8 border-gray-400"
            aria-label="Buscar tarjetas"
          />
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}

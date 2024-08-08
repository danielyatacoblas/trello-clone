import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <nav className="sticky right-0 left-0 flex justify-between px-12 py-4 shadow-2xl">
      <h2 className="text-2xl font-semibold">TaskList</h2>
      <div className="flex gap-8">
        <ModeToggle />
      </div>
    </nav>
  );
}

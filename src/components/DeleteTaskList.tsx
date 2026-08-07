import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useTasks from "@/hooks/useTasks";
import { Cross2Icon } from "@radix-ui/react-icons";

type props = {
  id: string;
  name: string;
};

export function DeleteTaskList({ id, name }: props) {
  const { deleteTaskList } = useTasks();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* Un botón real (y no el icono suelto) para que sea alcanzable con
            teclado y tenga estados hover/focus visibles. */}
        <button
          type="button"
          aria-label={`Eliminar la lista ${name || "sin nombre"}`}
          title="Eliminar lista"
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-panel-foreground/70 transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Cross2Icon />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Desea eliminar la lista de tareas {name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente la
            lista y todas sus tarjetas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteTaskList(id)}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

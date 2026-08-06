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
import { Button } from "@/components/ui/button";
import useTasks from "@/hooks/useTasks";
import { TrashIcon } from "@radix-ui/react-icons";

type props = {
  idList: string;
  id: string;
};

export function DeleteTask({ idList, id }: props) {
  const { deleteTask } = useTasks();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-6 h-6 p-0" variant={"destructive"}>
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Desea eliminar la tarea?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. La tarjeta se eliminará
            permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteTask(idList, id)}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

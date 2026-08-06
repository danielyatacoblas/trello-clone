"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useState } from "react";

type props = {
  createTaskList: (nameList: string) => void;
};

export default function AddListTask({ createTaskList }: props) {
  const [listName, setListName] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  const submitList = () => {
    createTaskList(listName);
    setListName("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2 font-semibold ">
          <PlusCircledIcon />
          Agregar lista
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            Agregar lista de tareas
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              value={listName}
              onChange={onChange}
              className="border-gray-500 col-span-4 text-foreground"
              placeholder="Nombre de la lista"
              required
            />
          </div>
        </div>
        <DialogFooter>
          {listName ? (
            <DialogClose>
              <Button type="submit" onClick={submitList}>
                Guardar
              </Button>
            </DialogClose>
          ) : (
            <Button type="submit">Guardar</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

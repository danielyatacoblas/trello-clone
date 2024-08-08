"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/interfaces/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

type DialogTaskProps = {
  isEdit: boolean;
  btn: React.ReactNode;
  task?: Task;
};

const taskSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(5, { message: "Description is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});

export default function DialogTask({ task, isEdit, btn }: DialogTaskProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      id: task?.id ?? 1,
      description: task?.description ?? "",
      status: task?.status ?? "",
    },
  });

  const onSubmit = (data: Task) => {
    setOpen(false);
    alert(JSON.stringify(data, null, 2));
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Edit Task" : "Add Task"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-gray-400"
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full border-gray-400">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent className="z-[999]">
                          <SelectGroup>
                            <SelectItem value="to do">To Do</SelectItem>
                            <SelectItem value="process">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Confirm
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

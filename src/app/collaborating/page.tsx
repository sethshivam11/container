"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  projectDescription,
  projectEndDate,
  projectStartDate,
  projectTitle,
} from "@/schemas/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, History, Plus, Search } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { nameFallback } from "@/lib/helpers";
import Image from "next/image";

export default function Home() {
  const formSchema = z.object({
    title: projectTitle,
    description: projectDescription,
    startDate: projectStartDate,
    endDate: projectEndDate,
  });
  const [image, setImage] = React.useState<File | null>(null);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const date = new Date();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: date,
      endDate: date,
    },
  });
  const projects = [
    {
      title: "Task 1",
      description: "This is the first task",
      endDate: "2024-10-08T18:35:53.000Z",
      active: true,
      admin: [
        {
          fullName: "John Doe",
          username: "johndoe",
          avatar:
            "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1723483837/sociial/settings/r5pvoicvcxtyhjkgqk8y.png",
        },
      ],
      _id: "66caabe7c4ac6c787df4cc42",
    },
    {
      title: "Task 2",
      description: "This is the second task",
      image:
        "http://res.cloudinary.com/dv3qbj0bn/image/upload/v1724558310/sociial/ei5dc5llcnbfp66a8wjj.jpg",
      endDate: "2024-10-08T18:35:53.000Z",
      active: true,
      admin: [
        {
          fullName: "John Doe",
          username: "johndoe",
          avatar:
            "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1723483837/sociial/settings/r5pvoicvcxtyhjkgqk8y.png",
        },
      ],
      _id: "66caabe7c4ac6c787df4cc42",
    },
    {
      title: "Task 3",
      description: "This is the third task",
      endDate: "2024-10-08T18:35:53.000Z",
      image:
        "http://res.cloudinary.com/dv3qbj0bn/image/upload/v1724558310/sociial/ei5dc5llcnbfp66a8wjj.jpg",
      active: true,
      admin: [
        {
          fullName: "John Doe",
          username: "johndoe",
          avatar:
            "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1723483837/sociial/settings/r5pvoicvcxtyhjkgqk8y.png",
        },
      ],
      _id: "66caabe7c4ac6c787df4cc42",
    },
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="flex flex-col min-h-screen h-max xl:col-span-8 sm:col-span-9 col-span-10">
      <div className="w-full px-10 py-8 flex flex-col gap-6">
        <div className="flex justify-between">
          <h1 className="text-3xl tracking-tighter font-bold">Collaborating</h1>
          {projects.length && (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setAddDialogOpen(true)}
            >
              <Plus />
            </Button>
          )}
        </div>
        {projects.length && (
          <div className="flex space-between gap-4">
            <Input placeholder="Search for tasks" />
            <Button className="flex gap-2">
              <Search /> Search
            </Button>
          </div>
        )}
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 container py-6">
        {projects.length ? (
          projects.map((project, index) => (
            <Link
              href={`/project/${project._id}`}
              key={index}
              className="flex justify-between min-h-52 h-fit rounded-xl"
            >
              <div className="flex flex-col gap-2 w-full bg-stone-200 dark:bg-stone-800 shadow-md rounded-lg p-6 min-h-48 h-fit relative overflow-hidden object-contain">
                {project.image && (
                  <Image
                    src={project.image}
                    alt=""
                    className="absolute top-0 left-0 object-contain w-full opacity-20"
                    width="500"
                    height="500"
                  />
                )}
                <h1 className="text-2xl tracking-tighter font-bold">
                  {project.title}
                </h1>
                <p className="text-stone-500">{project.description}</p>
                <div className="flex gap-2 items-center">
                  {project.admin.map((admin, index) => (
                    <Avatar key={index}>
                      <AvatarImage src={admin.avatar} />
                      <AvatarFallback>
                        {nameFallback(admin.fullName)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-4 flex flex-col items-center justify-center gap-3">
            <History size="80" />
            <h1 className="text-2xl tracking-tight font-bold">No projects</h1>
            <p className="text-stone-500">Create a project now</p>
            <Button
              className="flex gap-2"
              onClick={() => setAddDialogOpen(true)}
            >
              <Plus /> Create
            </Button>
          </div>
        )}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent>
            <DialogTitle>Create Project</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          placeholder="Title"
                          onChange={(e) => {
                            if (e.target.files) {
                              setImage(e.target.files[0]);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button">Create</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

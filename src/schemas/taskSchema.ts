import { z } from "zod";

export const taskTitle = z
  .string()
  .min(2, {
    message: "Title must be at least 2 characters long",
  })
  .max(50, {
    message: "Title must be at most 50 characters long",
  });

export const taskDescription = z
    .string()
    .min(10, {
        message: "Description must be at least 10 characters long",
    })
    .max(1000, {
        message: "Description must be at most 1000 characters long",
    });

export const taskDueDate = z.date({ message: "Due date must be a valid date" });
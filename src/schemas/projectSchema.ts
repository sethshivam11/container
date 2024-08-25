import { z } from "zod";

export const projectTitle = z
  .string()
  .min(2, {
    message: "Title must be at least 2 characters long",
  })
  .max(50, {
    message: "Title must be at most 50 characters long",
  });

export const projectDescription = z
  .string()
  .min(10, {
    message: "Description must be at least 10 characters long",
  })
  .max(1000, {
    message: "Description must be at most 1000 characters long",
  });

export const projectStartDate = z.date({
  required_error: "Start date must be a valid date",
});

export const projectEndDate = z.date({
  required_error: "End date must be a valid date",
});

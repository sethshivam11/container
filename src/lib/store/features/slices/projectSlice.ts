import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProjects = createAsyncThunk("projects/getProjects", async () => {
    const response = await fetch("http://localhost:3000/api/v1/projects/get");
    return response.json();
});

export const createProject = createAsyncThunk("projects/createProject", async (project: {
    title: string;
    description: string;
    image: File;
    startDate: string;
    dueDate: string;
}) => {
    const response = await fetch("http://localhost:3000/api/v1/projects/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    });
    return response.json();
});
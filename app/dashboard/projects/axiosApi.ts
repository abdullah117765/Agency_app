import axios from "axios";

// Set up the axios instance with the base URL from the environment variable
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// API methods
const createProject = async (project: FormData) => {
    return api.post("/projects", project);
};

// const updateProject = async (id: string, project: Project) => {
//     return api.put(`/projects/${id}`, project);
// };


const updateProject = async (id: string, formData: FormData) => {
    return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, formData);
};

const deleteProject = async (id: string) => {
    return api.delete(`/projects/${id}`);
};

const updateStatus = async (id: string, status: string) => {
    return api.patch(`/projects/status/${id}`, { status });
};


export { createProject, deleteProject, updateProject, updateStatus };


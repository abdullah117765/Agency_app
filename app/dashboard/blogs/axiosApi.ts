import axios from "axios";

// Set up the axios instance with the base URL from the environment variable
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// API methods
const createBlog = async (blog: FormData) => {
    return api.post("/blogs", blog);
};

// const updateBlog = async (id: string, blog: Blog) => {
//     return api.put(`/blogs/${id}`, blog);
// };


const updateBlog = async (id: string, formData: FormData) => {
    return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, formData);
};

const deleteBlog = async (id: string) => {
    return api.delete(`/blogs/${id}`);
};

const updateStatus = async (id: string, status: string) => {
    return api.patch(`/blogs/status/${id}`, { status });
};


export { createBlog, deleteBlog, updateBlog, updateStatus };


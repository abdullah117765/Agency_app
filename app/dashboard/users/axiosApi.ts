import axios from "axios";

// Set up the axios instance with the base URL from the environment variable
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// API methods
const createUser = async (user: FormData) => {
    return api.post("/users", user);
};

// const updateUser = async (id: string, user: User) => {
//     return api.put(`/users/${id}`, user);
// };


const updateUser = async (id: string, formData: FormData) => {
    return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, formData);
};

const deleteUser = async (id: string) => {
    return api.delete(`/users/${id}`);
};

const updateStatus = async (id: string, status: string) => {
    return api.patch(`/users/status/${id}`, { status });
};


export { createUser, deleteUser, updateStatus, updateUser };


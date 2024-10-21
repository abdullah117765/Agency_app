import axios from "axios";

// Set up the axios instance with the base URL from the environment variable
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// API methods
const createService = async (service: FormData) => {
    return api.post("/services", service);
};

// const updateService = async (id: string, service: Service) => {
//     return api.put(`/services/${id}`, service);
// };


const updateService = async (id: string, formData: FormData) => {
    return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/services/${id}`, formData);
};

const deleteService = async (id: string) => {
    return api.delete(`/services/${id}`);
};

const updateStatus = async (id: string, status: string) => {
    return api.patch(`/services/status/${id}`, { status });
};


export { createService, deleteService, updateStatus, updateService };


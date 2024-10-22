import axios from "axios";

// Set up the axios instance with the base URL from the environment variable
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// API methods
const createContact = async (contact: FormData) => {
    return api.post("/contacts", contact);
};

// const updateContact = async (id: string, contact: Contact) => {
//     return api.put(`/contacts/${id}`, contact);
// };


const updateContact = async (id: string, formData: FormData) => {
    return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${id}`, formData);
};

const deleteContact = async (id: string) => {
    return api.delete(`/contacts/${id}`);
};

const updateStatus = async (id: string, status: string) => {
    return api.patch(`/contacts/status/${id}`, { status });
};


export { createContact, deleteContact, updateContact, updateStatus };


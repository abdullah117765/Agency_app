import axios from "axios";

// Set up the axios instance with the base URL from the environment variable
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// API methods
const createQuote = async (quote: FormData) => {
    return api.post("/quotes", quote);
};

// const updateQuote = async (id: string, quote: Quote) => {
//     return api.put(`/quotes/${id}`, quote);
// };


const updateQuote = async (id: string, formData: FormData) => {
    return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/quotes/${id}`, formData);
};

const deleteQuote = async (id: string) => {
    return api.delete(`/quotes/${id}`);
};

const updateStatus = async (id: string, status: string) => {
    return api.patch(`/quotes/status/${id}`, { status });
};


export { createQuote, deleteQuote, updateQuote, updateStatus };


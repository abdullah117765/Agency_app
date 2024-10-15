import axios from "axios";

// Set up the axios instance with the base URL from the environment variable
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// API methods
const createTestimonial = async (testimonial: FormData) => {
    return api.post("/testimonials", testimonial);
};

// const updateTestimonial = async (id: string, testimonial: Testimonial) => {
//     return api.put(`/testimonials/${id}`, testimonial);
// };


const updateTestimonial = async (id: string, formData: FormData) => {
    return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/${id}`, formData);
};

const deleteTestimonial = async (id: string) => {
    return api.delete(`/testimonials/${id}`);
};

const updateStatus = async (id: string, status: string) => {
    return api.patch(`/testimonials/status/${id}`, { status });
};


export { createTestimonial, deleteTestimonial, updateStatus, updateTestimonial };


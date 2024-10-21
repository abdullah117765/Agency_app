
export interface User {
    id: string;
    status: string;
    fullname: string;
    role: string;
    email: string;
    image: File | string | null; // Allow both File and URL types 
    phoneNumber: string;
    twitter?: string; // Optional property
    instagram?: string; // Optional property
    linkedin?: string; // Optional property
}

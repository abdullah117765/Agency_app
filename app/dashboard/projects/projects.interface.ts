
export interface Project {
    id: string;
    title: string;
    description: string;
    image: File | string | null; // Allow both File and URL types 
    status: string;
    createdAt: Date;
}

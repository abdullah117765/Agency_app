
export interface Blog {
    id: string;
    status: string;
    title: string;
    author: string;
    description: string;
    image: File | string | null; // Allow both File and URL types 
    createdAt: Date;

}

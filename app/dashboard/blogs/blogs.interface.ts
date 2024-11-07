
export interface Blog2 {
    id: string;
    status: string;
    title: string;
    author: string;
    description: string;
    image: File | string | null; // Allow both File and URL types 
    createdAt: Date ;

}
export interface Blog {
    id: string;
    status: string;
    title: string;
    author: string;
    image: File | string | null; // Allow both File and URL types 

}
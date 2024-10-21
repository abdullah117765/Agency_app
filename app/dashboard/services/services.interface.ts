
export interface Service {
    id: string;
    title: string;
    description: string;
    image: File | string | null; // Allow both File and URL types 
    price: number;
    status: string;
}

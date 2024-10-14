interface Testimonial {
    id: string;
    fullName: string;
    description: string;
    image: File | string | null; // Allow both File and URL types
    status: string;
}
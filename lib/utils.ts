import axios from 'axios';
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const trackVisitor = async () => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/analytics/track-visitor`);
    console.log(response.data.message);
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
};




export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

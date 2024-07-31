import type {HaircutType} from "@/types/haircutType";

export interface CartType {
    haircut_id: number;
    name: string;
    price: number;
    imageSrc: string;
    imageAlt: string;
    quantity: number;
}
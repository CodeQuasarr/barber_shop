
export interface HaircutType {
    id: number;
    name: string;
    description?: string;
    price: number;
    category: string;
    imageSrc: string;
    imageAlt: string;
    date: string;
    sales: number;
    isOnSale: boolean;
}


export interface HaircutDetailType {
    id: number;
    name: string;
    price: number;
    description: string;
    stripe_product_id: string;
    details: string;
    images: ImageType[];
    highlights: string[];
    sizes: SizeType[];
}

export interface shopType {
    stripe_product_id: string;
    sizes: string;
    price: number;
    name: string;
    quantity: number;
    imageSrc: string;
    imageAlt: string;
}

interface ImageType {
    src: string;
    alt: string;
}

interface SizeType {
    name: string;
    inStock: boolean;
}

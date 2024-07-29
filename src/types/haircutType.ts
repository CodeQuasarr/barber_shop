
export interface HaircutType {
    id?: string;
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

interface ImageType {
    src: string;
    alt: string;
}

interface SizeType {
    name: string;
    inStock: boolean;
}

export type Product = {
    _id: string;
    name: string;
    slug: string;
    imageUrl: string;
    price: number;
    tags: string[];
    brand: string;
    inStock: boolean;
    features: string[];
    rating?: number;
    dateAdded?: string;
    category: {
      _id: string;
      name: string;
    };
  };
  
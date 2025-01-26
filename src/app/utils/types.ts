export type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  imageUrl: string;
  price: number;
  features: string[];
  rating: number;
  tags: string[];
  inStock: boolean;
  category: { _id: string; name: string };
};

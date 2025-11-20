export interface Product {
  id: number;
  title: string;
  price: number;
  mrp?: number;
  weight: number;
  brand?: string;
  category: string;
  image: string;
}
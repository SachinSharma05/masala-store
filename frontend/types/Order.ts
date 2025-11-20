export interface Order {
  id: string;
  items: { id: number; name: string; price: number; quantity: number }[];
  total: number;
  date: string;
  status: string;
}
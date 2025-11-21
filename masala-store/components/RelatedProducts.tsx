import ProductCard from "./ProductCard";
import { RelatedProductsProps } from "@/types/RelatedProductsProps";

const sampleProducts = [
  { id: 1, title: "Garam Masala 100g", price: 45, image: "/prod/garam100.jpg" },
  { id: 2, title: "Chaat Masala 100g", price: 35, image: "/prod/chaat100.jpg" },
  { id: 3, title: "Pav Bhaji Masala 100g", price: 50, image: "/prod/pav100.jpg" },
  { id: 4, title: "Sambhar Masala 100g", price: 55, image: "/prod/sambhar100.jpg" },
];

export default function RelatedProducts({ currentId }: RelatedProductsProps) {
  const filtered = sampleProducts.filter((p) => p.id !== currentId);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Related Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

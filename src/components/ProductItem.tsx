import React from "react";
import type { PublicProduct } from "../types/product";

interface ProductItemProps {
  product: PublicProduct;
  onSelect?: (id: string) => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product, onSelect }) => {
  const displayName = product?.name ?? "Unnamed Item";
  const displayPrice = product?.price != null ? `$${product.price.toFixed(2)}` : "$0.00";
  const details = product?.description ?? "No description available.";

  return (
    <div className="product-card" onClick={() => onSelect?.(product.id)}>
      <h3>{displayName}</h3>
      <p>{details}</p>
      <span>{displayPrice}</span>
    </div>
  );
};
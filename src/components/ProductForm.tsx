// src/components/ProductForm.tsx
import React, { useState } from "react";
import type { ProductFormDraft, PublicProduct } from "../types/product";

interface ProductFormProps {
  onSubmit: (product: PublicProduct) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [draft, setDraft] = useState<ProductFormDraft>({
    name: "",
    price: 0,
    stockCount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setDraft((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft.name || draft.price == null) return;

    onSubmit({
      id: crypto.randomUUID(),
      name: draft.name,
      price: draft.price,
      description: draft.description ?? "",
      stockCount: draft.stockCount ?? 0,
    });

    setDraft({ name: "", price: 0, stockCount: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={draft.name ?? ""}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={draft.price ?? 0}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};
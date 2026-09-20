import React, { useState, useEffect } from "react";
import type { PublicProduct, DummyJsonResponse } from "./types/product";
import { ProductItem } from "./components/ProductItem";
import { ProductForm } from "./components/ProductForm";

export const App: React.FC = () => {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
  try {
    setLoading(true);
    const res = await fetch("https://dummyjson.com/products?limit=5");
    const data: DummyJsonResponse = await res.json();

    const mapped: PublicProduct[] = data.products.map((p) => ({
      id: String(p.id),
      name: p.title,
      price: p.price,
      description: p.description,
      stockCount: p.stock,
    }));
    
    setProducts(mapped);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  return (
    <main>
      <h1>Product Catalog</h1>
      <ProductForm onSubmit={(newProd) => setProducts((prev) => [...prev, newProd])} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-list">
          {products?.map((p) => (
            <ProductItem key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
};
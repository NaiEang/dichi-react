import React, { useState } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  onSale: boolean;
}

export interface FormData {
  name: string;
  price: string;
}

export interface FormErrors {
  name?: string;
  price?: string;
}

const INITIAL_ITEMS: Product[] = [
  { id: 1, name: "Mechanical Keyboard", price: 120, inStock: true, onSale: true },
  { id: 2, name: "Wireless Mouse", price: 45, inStock: false, onSale: false },
  { id: 3, name: "4K Monitor", price: 350, inStock: true, onSale: true },
];

export default function App() {
  const [items, setItems] = useState<Product[]>(INITIAL_ITEMS);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ name: "", price: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const visibleItems = onlyInStock ? items.filter((i) => i.inStock) : items;
  const saleCount = items.filter((i) => i.onSale).length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    const cleanName = formData.name.trim();
    const cleanPrice = Number(formData.price);

    if (!cleanName) {
      newErrors.name = "Name is required";
    }

    if (!formData.price || isNaN(cleanPrice) || cleanPrice <= 0) {
      newErrors.price = "Enter a valid positive price";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setItems([
      ...items,
      {
        id: Date.now(),
        name: cleanName,
        price: cleanPrice,
        inStock: true,
        onSale: false,
      },
    ]);

    setFormData({ name: "", price: "" });
    setErrors({});
  };

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", padding: "0 16px", fontFamily: "sans-serif", color: "#111" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Inventory</h2>
        {saleCount > 0 && (
          <span style={{ backgroundColor: "#ef4444", color: "#fff", padding: "4px 12px", borderRadius: "9999px", fontSize: "12px", fontWeight: "bold" }}>
            🔥 {saleCount} On Sale
          </span>
        )}
      </div>

      <form onSubmit={addItem} style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <input
              type="text"
              name="name"
              placeholder="Item name"
              value={formData.name}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "6px 8px", border: errors.name ? "1px solid #a00" : "1px solid #ccc", boxSizing: "border-box" }}
            />
            {errors.name && <div style={{ color: "#a00", fontSize: 12, marginTop: 2 }}>{errors.name}</div>}
          </div>

          <div style={{ width: 110 }}>
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "6px 8px", border: errors.price ? "1px solid #a00" : "1px solid #ccc", boxSizing: "border-box" }}
            />
            {errors.price && <div style={{ color: "#a00", fontSize: 12, marginTop: 2 }}>{errors.price}</div>}
          </div>

          <button type="submit" style={{ padding: "6px 14px", cursor: "pointer", height: 31 }}>
            Add
          </button>
        </div>
      </form>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 12 }}>
        <label style={{ cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            style={{ marginRight: 6 }}
          />
          In stock only
        </label>
        <span style={{ color: "#666" }}>Displaying {visibleItems.length} of {items.length} items</span>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left" }}>
            <th style={{ padding: "8px 0" }}>Name</th>
            <th style={{ padding: "8px 0", width: 80 }}>Price</th>
            <th style={{ padding: "8px 0", width: 100 }}>Status</th>
            <th style={{ padding: "8px 0", width: 60 }}>Sale</th>
          </tr>
        </thead>
        <tbody>
          {visibleItems.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 0" }}>{item.name}</td>
              <td style={{ padding: "8px 0" }}>${item.price.toFixed(2)}</td>
              <td style={{ padding: "8px 0" }}>
                <span style={{
                  padding: "2px 8px",
                  borderRadius: 12,
                  fontSize: 12,
                  backgroundColor: item.inStock ? "#d1fae5" : "#f3f4f6",
                  color: item.inStock ? "#065f46" : "#6b7280",
                  fontWeight: 600
                }}>
                  {item.inStock ? "In stock" : "Sold out"}
                </span>
              </td>
              <td style={{ padding: "8px 0", color: item.onSale ? "#dc2626" : "#ccc" }}>
                {item.onSale ? "Yes" : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

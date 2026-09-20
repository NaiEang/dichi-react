export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  internalCost: number;
  stockCount: number;
}

export interface DummyJsonResponse {
  products: {
    id: number;
    title: string;
    price: number;
    description: string;
    stock: number;
  }[];
}

export type PublicProduct = Omit<Product, "internalCost">;

export type ProductFormDraft = Partial<PublicProduct>;
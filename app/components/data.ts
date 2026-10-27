export interface MobileItem {
  id: string;
  brand: string;
  model: string;
  variant: string;
  stock: number;
  sold: number;
  price: number;
}

export const initialMobiles: MobileItem[] = [
  {
    id: "1",
    brand: "Samsung",
    model: "Galaxy A54 5G",
    variant: "8/128 GB",
    stock: 8,
    sold: 14,
    price: 38500,
  },
  {
    id: "2",
    brand: "Xiaomi",
    model: "Redmi Note 13",
    variant: "6/128 GB",
    stock: 5,
    sold: 21,
    price: 22999,
  },
  {
    id: "3",
    brand: "Apple",
    model: "iPhone 15",
    variant: "128 GB",
    stock: 3,
    sold: 7,
    price: 95000,
  },
];
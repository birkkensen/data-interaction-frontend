export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}
export interface CartItems {
  products: [
    {
      _id: string;
      name: string;
      description: string;
      image: string;
      price: number;
    }
  ];
  _id: string;
}

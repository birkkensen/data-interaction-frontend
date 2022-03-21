export interface User {
  email: string;
  password: string;
}

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
      product: {
        _id: string;
        name: string;
        description: string;
        image: string;
        price: number;
      };
      _id: string;
    }
  ];
  _id: string;
}

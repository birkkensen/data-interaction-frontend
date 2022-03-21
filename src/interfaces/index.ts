export interface User {
  email: string;
  password: string;
}

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  adress: string;
  country: string;
  zipcode: string;
  phone: string;
  creditCard: string;
  cvv: string;
  expireDate: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  inStock?: boolean;
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

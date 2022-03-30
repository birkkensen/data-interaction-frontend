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
  orderStatus: string;
  transactionId: number;
}
export interface Orders {
  _id: string;
  formData: {
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
    orderStatus: string;
    transactionId: number;
  };
  cart: {
    cartItems: [
      {
        _id: string;
        qty: number;
      }
    ];
    totalQty: number;
  };
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  inStock?: boolean;
}

export interface ICart {
  products: [
    {
      _id: string;
      name: string;
      description: string;
      image: string;
      price: number;
      inStock?: boolean;
      qty: number;
    }
  ];
  totalQty: number;
}

export interface ICheckout {
  products: [
    {
      _id: string;
      name: string;
      price: number;
      qty: number;
    }
  ];
  totalQty: number;
}
// export interface ICart {
//   products: IProduct[];
// }

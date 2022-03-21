import { Cart } from "../types";

export const calculateTotal = (cartItems: Cart[]) => {
  return cartItems.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
};
import { Pokemon } from "./types";

const calculateTotal = (cartItems: Pokemon[]) => {
    return cartItems.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
  };

export { calculateTotal };
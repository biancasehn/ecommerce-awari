import { sprite } from "../services/api";
import { useStore } from "../services/store";
import { Pokemon } from "../types";
import { getIdFromUrl } from "../utils/urls";

export const useUpdateCart = (onSuccess?: any) => {
  const { cartItems, updateCart } = useStore();
  const existingItem = (id: number) =>
    cartItems.filter((item) => item.id === id);

  const addItemToCart = (pokemon: Pokemon, event?: number) => {
    const id = getIdFromUrl(pokemon.url);
    const hasItem = existingItem(id);

    if (!hasItem.length) {
      updateCart([
        ...cartItems,
        { ...pokemon, id, count: 1, price: 10, sprite: `${sprite}/${id}.png` },
      ]);
    } else {
      updateCart(
        cartItems.map((item) => {
          if (item.id !== id) return item;
          return {
            ...item,
            ...pokemon,
            count: event ? event : item.count + 1,
            price: event ? event * 10 : item.price + 10,
          };
        })
      );
    }

    !!onSuccess && onSuccess();
  };

  const getInitialCart = (pokemon: any) => {
    updateCart(pokemon);
  };

  const removeItem = (pokemon: any) => {
    const id = getIdFromUrl(pokemon.url);
    updateCart(cartItems.filter((item) => item.id !== id));
  };

  return { addItemToCart, getInitialCart, removeItem };
};

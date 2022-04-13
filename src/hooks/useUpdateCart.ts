import { sprite } from "../services/api";
import { useStore } from "../services/store";
import { getIdFromUrl } from "../utils/getIdFromUrl"

export const useUpdateCart = (onSuccess?: any) => {
    const { cartItems, addItemToCart, updateCartItems, removeFromCart } = useStore();
    const existingItem = (id: number) => cartItems.filter((item) => item.id === id);
    
    const addItem = (pokemon: any) => {
      const id = getIdFromUrl(pokemon.url);
      const hasItem = existingItem(id)

      if (!hasItem.length) {
        addItemToCart([
          ...cartItems,
          {...pokemon,
          id,
          count: 1,
          price: 10,
          sprite: `${sprite}/${id}.png`,
          }
        ])
      } else {
        addItemToCart(cartItems.map((item) => {
          if (item.id !== id) return item
          return {
              ...item,
              ...pokemon,
              count: item.count + 1,
              price: item.price + 10,

            }
        }))
      }
  
      !!onSuccess && onSuccess()
    }

    const updateCart = (pokemon: any) => {
      updateCartItems(pokemon)
    }

    const removeItem = (pokemon: any) => {
      const id = getIdFromUrl(pokemon.url);
      removeFromCart(cartItems.filter((item) => item.id !== id));
    }
    
    return {addItem, updateCart, removeItem}
};
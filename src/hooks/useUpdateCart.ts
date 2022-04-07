import { sprite } from "../services/api";
import { useStore } from "../services/store";
import { getIdFromUrl } from "../utils/getIdFromUrl"

export const useUpdateCart = (onSuccess: any) => {
    const { cartItems, addItemToCart, updateItemCount } = useStore();
      
    const existingItem = (id: number) => cartItems.filter((item) => item.id === id
    );

    const addItem = (pokemon: any) => {
      const id = getIdFromUrl(pokemon.url);
      const hasItem = existingItem(id)

      !hasItem.length
        ?  addItemToCart({
            ...pokemon,
            id: id,
            count: 1,
            price: 10,
            sprite: `${sprite}/${getIdFromUrl(pokemon.url)}.png`,
          })
        : updateItemCount(
            cartItems.map((item) =>
              item.id === id
                ? {
                    ...item,
                    count: item.count + 1,
                    price: item.price + 10,
                  }
                : item
            )
          );

      !!onSuccess && onSuccess()
    }
    return {addItem}
};
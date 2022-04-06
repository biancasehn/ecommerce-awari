import { sprite } from "./services/api";
import { useStore } from "./services/store";
import { getIdFromUrl } from "./utils/getIdFromUrl"

export const useUpdateCart = (onSuccess: any) => {
    const { cartItems, addItemToCart, updateItemCount } = useStore();
      
    const existingItem = (pokemon: any) => cartItems.filter((item) => 
       item.name === pokemon.name
    );

    const addItem = (pokemon: any) => {
      const hasItem = existingItem(pokemon)

      const id = getIdFromUrl(pokemon.url);

      !hasItem.length
        ?  addItemToCart({
            ...pokemon,
            id: { id },
            count: 1,
            price: 10,
            sprite: `${sprite}/${getIdFromUrl(pokemon.url)}.png`,
          })
        : updateItemCount(
            cartItems.map((item) =>
              item.name === pokemon.name
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
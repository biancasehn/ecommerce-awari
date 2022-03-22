import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useStore } from "../store";
import { Pokemon, PokeDetails } from "../types";
import { sprite } from "../services/api";
import { SideCart } from ".";

const AddToCartButton: React.FC<any> = ({ pokemon }) => {
  const { cartItems, addItemToCart, updateItemCount } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addToCart = (pokemon: any, event: any) => {
    event.preventDefault();
    const id = `${pokemon.url
      .replace("https://pokeapi.co/api/v2/pokemon/", "")
      .replace("/", "")}`;
    const existingItem = cartItems.filter((item) => {
      return item.name === pokemon.name;
    });
    !existingItem.length
      ? addItemToCart({
          ...pokemon,
          id: { id },
          count: 1,
          price: 10,
          sprite: `${sprite}/${pokemon.url
            .replace("https://pokeapi.co/api/v2/pokemon/", "")
            .replace("/", "")}.png`,
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
    onOpen();
  };

  return (
    <>
      <Flex pb={4} justify="center">
        <Button
          onClick={(event) => addToCart(pokemon, event)}
          colorScheme="teal"
          _hover={{ bg: "#08c5937b", color: "#06694f" }}
        >
          Add to cart
        </Button>
      </Flex>
      <SideCart isOpen={isOpen} placement="right" onClose={onClose} />
    </>
  );
};

export default AddToCartButton;

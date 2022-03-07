import { MouseEvent, useEffect } from "react";
import {
  Box,
  Image,
  Button,
  Flex,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";
import SideCart from "./SideCart";
import { useStore } from "../store";
import { Pokemon } from "../types";
import { sprite } from "../services/api";

const Cards: React.FC<any> = () => {
  const {
    filterPokemons,
    setDisplayPokemons,
    displayPokemons,
    currentPage,
    cartItems,
    addItemToCart,
    increaseItemCount,
  } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const mouseOverImage = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transition = "all 300ms ease";
    event.currentTarget.style.transform = "scale(1.1)";
  };

  const mouseOutImage = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = "scale(1)";
  };

  const addToCart = (pokemon: Pokemon, event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const existingItem = cartItems.filter((item) => {
      return item.name === pokemon.name;
    });

    !existingItem.length
      ? addItemToCart({ ...pokemon, count: 1 })
      : increaseItemCount(
          cartItems.map((item) =>
            item.name === pokemon.name
              ? { ...item, count: item.count + 1 }
              : item
          )
        );
    onOpen();
  };

  useEffect(() => {
    setDisplayPokemons(
      filterPokemons.slice(currentPage * 20, currentPage * 20 + 20)
    );
  }, [currentPage]);

  return (
    <>
      <Grid templateColumns="repeat(auto-fill, minmax(160px, 1fr))" gap={2}>
        {displayPokemons.map((pokemon, pokemonIndex) => (
          <Box key={pokemonIndex} cursor="pointer">
            <Box maxW="sm" minH="100%" borderWidth="1px" borderRadius="lg">
              <Flex justify="center">
                <Image
                  src={`${sprite}/${pokemon.url
                    .replace("https://pokeapi.co/api/v2/pokemon/", "")
                    .replace("/", "")}.png`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = `${sprite}/0.png`;
                  }}
                  alt={pokemon.name}
                  onMouseOver={mouseOverImage}
                  onMouseOut={mouseOutImage}
                  maxW="10rem"
                />
              </Flex>
              <Box p="6">
                <Box
                  mt="1"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  {pokemon.name}
                </Box>
                <Box>€ {Math.ceil(Math.random() * 100)},00</Box>
              </Box>
              <Flex pb={4} justify="center">
                <Button
                  onClick={(event) => addToCart(pokemon, event)}
                  colorScheme="teal"
                  _hover={{ bg: "#08c5937b", color: "#06694f" }}
                >
                  Add to cart
                </Button>
              </Flex>
            </Box>
          </Box>
        ))}
      </Grid>
      <SideCart isOpen={isOpen} placement="right" onClose={onClose} />
    </>
  );
};

export default Cards;

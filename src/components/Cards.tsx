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
import { useNavigate } from "react-router-dom";

const Cards: React.FC<any> = () => {
  const {
    filterPokemons,
    setDisplayPokemons,
    displayPokemons,
    currentPage,
    cartItems,
    addItemToCart,
    updateItemCount,
  } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let navigate = useNavigate();

  const mouseOverImage = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transition = "all 300ms ease";
    event.currentTarget.style.transform = "scale(1.1)";
  };

  const mouseOutImage = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = "scale(1)";
  };

  const goToDetails = (event: React.SyntheticEvent, pokemon: Pokemon) => {
    event.preventDefault();
    const id = pokemon.url
      .replace("https://pokeapi.co/api/v2/pokemon/", "")
      .replace("/", "");
    navigate(`/details/${id}`);
  };

  const addToCart = (pokemon: Pokemon, event: MouseEvent<HTMLElement>) => {
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
                  onClick={(event) => goToDetails(event, pokemon)}
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
                <Box>€ 10,00</Box>
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

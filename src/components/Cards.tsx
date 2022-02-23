import { MouseEvent, useEffect } from "react";
import SideCart from "./SideCart";
import { useStore } from "../store";
import { sprite } from "../services/api";
import {
  Box,
  Image,
  Button,
  Flex,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";

const Cards: React.FC<any> = () => {
  const {
    numberOfPokemons,
    filterPokemons,
    setDisplayPokemons,
    displayPokemons,
    currentPage,
  } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const mouseOverImage = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transition = "all 300ms ease";
    event.currentTarget.style.transform = "scale(1.1)";
  };

  const mouseOutImage = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = "scale(1)";
  };

  useEffect(() => {
    numberOfPokemons > 20 &&
      setDisplayPokemons(
        filterPokemons?.slice(currentPage * 20, currentPage * 20 + 20)
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
                  onClick={onOpen}
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

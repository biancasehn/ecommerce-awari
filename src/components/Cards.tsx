import { MouseEvent, useEffect } from "react";
import { Box, Image, Button, Flex, Grid } from "@chakra-ui/react";
import { useStore } from "../store";
import { sprite } from "../services/api";
import { Pokemon } from "../types";
import { useNavigate } from "react-router-dom";
import { AddToCartButton } from "./";

const Cards: React.FC<any> = () => {
  const { filterPokemons, setDisplayPokemons, displayPokemons, currentPage } =
    useStore();
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
              <AddToCartButton pokemon={pokemon} />
            </Box>
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default Cards;

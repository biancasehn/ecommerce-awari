import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { useStore } from "../../store";
import { SideCart, Cards, Pagination } from "../../components";
import { Pokemon } from "../../types";
import { Box, Flex } from "@chakra-ui/react";

const Search = () => {
  const { pokeName } = useParams();
  const {
    setCurrentPage,
    totalNumberOfPokemons,
    setCurrentNumberOfPokemons,
    setDisplayPokemons,
    setFilterPokemons,
  } = useStore();

  const getAllPokemons = async () => {
    try {
      const response = await api.get(`/pokemon?limit=${totalNumberOfPokemons}`);
      if (!pokeName) return;
      const filterPokeName = response.data.results.filter(
        (pokemon: Pokemon) => {
          return pokemon.name.includes(pokeName);
        }
      );
      setCurrentNumberOfPokemons(filterPokeName.length);
      setFilterPokemons(filterPokeName);
      filterPokeName.length > 20
        ? setDisplayPokemons(filterPokeName.slice(0, 20))
        : setDisplayPokemons(filterPokeName);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
    getAllPokemons();
  }, [pokeName]);

  return (
    <Box p={4}>
      <Cards />
      <Flex justify="center">
        <Pagination />
      </Flex>
      <SideCart />
    </Box>
  );
};

export default Search;

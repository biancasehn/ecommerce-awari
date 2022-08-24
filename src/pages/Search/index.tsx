import { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { useStore } from "../../services/store";
import {
  Helmet,
  SideCart,
  Cards,
  Pagination,
  SearchBar,
} from "../../components";
import { Pokemon } from "../../types";

const Search = () => {
  const { pokeName } = useParams();
  const {
    setCurrentPage,
    totalNumberOfPokemons,
    setCurrentNumberOfPokemons,
    setDisplayPokemons,
    setFilterPokemons,
    filterPokemons,
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
    <>
      <Helmet path={"Search"} />
      <Box>
        <SearchBar searchParam={pokeName} />
        {!filterPokemons.length ? (
          <Box p="20px" textAlign="center" fontWeight="bold">
            No items found
          </Box>
        ) : (
          <>
            <Cards />
            <Flex justify="center">
              <Pagination />
            </Flex>
            <SideCart />
          </>
        )}
      </Box>
    </>
  );
};

export default Search;

import { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { api } from "../../services/api";
import { useStore } from "../../services/store";
import { SideCart, Cards, Pagination } from "../../components";
import { ResponseData } from "../../types";

const Home = () => {
  const {
    currentPage,
    setDisplayPokemons,
    setTotalNumberOfPokemons,
    setCurrentNumberOfPokemons,
  } = useStore();

  const setPokemons = (response: ResponseData) => {
    setTotalNumberOfPokemons(response.count);
    setCurrentNumberOfPokemons(response.count);
    setDisplayPokemons(response.results);
  };

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await api.get(
          `/pokemon?offset=${currentPage * 20}&limit=20`
        );
        setPokemons(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPokemons();
  }, [currentPage]);

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

export default Home;

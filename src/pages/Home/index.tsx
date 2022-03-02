import { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { api } from "../../services/api";
import { useStore } from "../../store";
import { SideCart, Cards, Pagination } from "../../components";

const Home = () => {
  const {
    currentPage,
    setDisplayPokemons,
    setTotalNumberOfPokemons,
    setCurrentNumberOfPokemons,
  } = useStore();

  const setPokemons = (response) => {
    setTotalNumberOfPokemons(response.data.count);
    setCurrentNumberOfPokemons(response.data.count);
    setDisplayPokemons(response.data.results);
  };

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await api.get(
          `/pokemon?offset=${currentPage * 20}&limit=20`
        );
        setPokemons(response);
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

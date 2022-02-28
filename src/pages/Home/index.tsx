import { useEffect } from "react";
import { api } from "../../services/api";
import { useStore } from "../../store";
import { SideCart, Cards, Pagination } from "../../components";
import { Box, Flex } from "@chakra-ui/react";

const Home = () => {
  const { currentPage, setDisplayPokemons, setTotalNumberOfPokemons, setCurrentNumberOfPokemons } = useStore();

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await api.get(`/pokemon?offset=${(currentPage) * 20}&limit=20`);
        setTotalNumberOfPokemons(response.data.count);
        setCurrentNumberOfPokemons(response.data.count)
        setDisplayPokemons(response.data.results);
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

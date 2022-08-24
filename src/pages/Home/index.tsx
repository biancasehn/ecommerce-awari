import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { api } from "../../services/api";
import { useStore } from "../../services/store";
import { ResponseData } from "../../types";
import { Cards, Pagination, SearchBar, SideCart } from "../../components";

const Home = () => {
  const [isCardLoading, setIsCardLoading] = useState<Boolean>(false);

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
      setIsCardLoading(true);
      try {
        const response = await api.get(
          `/pokemon?offset=${currentPage * 20}&limit=20`
        );
        setPokemons(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsCardLoading(false);
      }
    };
    getPokemons();
  }, [currentPage]);

  return (
    <Box p={4} mt={6}>
      <SearchBar />
      <Cards isCardLoading={isCardLoading} />
      <Flex justify="center">
        <Pagination />
      </Flex>
      <SideCart />
    </Box>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { api } from "../../services/api";
import { useStore } from "../../services/store";
import { ResponseData } from "../../types";
import { Cards, Pagination, SearchBar, SideCart } from "../../components";
import { getIdFromUrl } from "../../utils/urls";

const Home = () => {
  const [isCardLoading, setIsCardLoading] = useState<Boolean>(false);
  const [completeData, setCompleteData] = useState<any>([]);
  const {
    currentPage,
    setDisplayPokemons,
    setTotalNumberOfPokemons,
    setCurrentNumberOfPokemons,
  } = useStore();

  const getDetailedData = async (
    basicData: { name: string; url: string }[]
  ) => {
    return Promise.all(
      basicData.map(async (pokemon: { name: string; url: string }) => {
        const details = await api.get(`/pokemon/${getIdFromUrl(pokemon.url)}`);
        return { ...pokemon, ...details.data };
      })
    );
  };

  useEffect(() => {
    const getPokemons = async () => {
      setIsCardLoading(true);
      try {
        const basicData = await api.get(
          `/pokemon?offset=${currentPage * 20}&limit=20`
        );
        setTotalNumberOfPokemons(basicData.data.count);
        setCurrentNumberOfPokemons(basicData.data.count);
        setDisplayPokemons(await getDetailedData(basicData.data.results));
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

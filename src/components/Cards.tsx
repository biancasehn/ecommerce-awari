import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Box,
  Button,
  Flex,
  Grid,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { useStore } from "../services/store";
import { PokeImage, SideCart } from "./";
import { useUpdateCart } from "../hooks";

const Cards: React.FC<any> = ({ isCardLoading }) => {
  const { filterPokemons, setDisplayPokemons, displayPokemons, currentPage } =
    useStore();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { addItemToCart } = useUpdateCart(onOpen);

  useEffect(() => {
    setDisplayPokemons(
      filterPokemons.slice(currentPage * 20, currentPage * 20 + 20)
    );
  }, [currentPage]);

  return (
    <>
      <Grid templateColumns="repeat(auto-fill, minmax(160px, 1fr))" gap={2}>
        {displayPokemons.map((pokemon, pokemonIndex) => (
          <Box key={pokemonIndex}>
            <Skeleton isLoaded={!isCardLoading}>
              <Box maxW="sm" minH="100%" borderWidth="1px" borderRadius="lg">
                <Flex justify="center" cursor="pointer">
                  <PokeImage pokemon={pokemon} hoverImage={true} size="150px" />
                </Flex>
                <Box p="4px 10px">
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
                <Flex justify="flex-end" p="4px">
                  <Button
                    onClick={() => addItemToCart(pokemon)}
                    variant="addToCart"
                    p="0"
                  >
                    <AiOutlinePlus />
                  </Button>
                </Flex>
              </Box>
            </Skeleton>
          </Box>
        ))}
      </Grid>
      <SideCart isOpen={isOpen} placement="right" onClose={onClose} />
    </>
  );
};

export default Cards;

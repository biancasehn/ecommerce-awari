import { MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Box,
  Image,
  Button,
  Flex,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";
import { useStore } from "../services/store";
import { sprite } from "../services/api";
import { SideCart } from "./";
import { useUpdateCart } from "../hooks/useUpdateCart";
import { getIdFromUrl } from "../utils/getIdFromUrl";

const Cards: React.FC<any> = () => {
  const { filterPokemons, setDisplayPokemons, displayPokemons, currentPage } =
    useStore();
  let navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { addItem } = useUpdateCart(onOpen);

  const mouseOverImage = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transition = "all 300ms ease";
    event.currentTarget.style.transform = "scale(1.1)";
  };

  const mouseOutImage = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = "scale(1)";
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
          <Box key={pokemonIndex}>
            <Box maxW="sm" minH="100%" borderWidth="1px" borderRadius="lg">
              <Flex justify="center" cursor="pointer">
                <Image
                  src={`${sprite}/${getIdFromUrl(pokemon.url)}.png`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = `${sprite}/0.png`;
                  }}
                  onClick={() =>
                    navigate(`/details/${getIdFromUrl(pokemon.url)}`)
                  }
                  onMouseOver={mouseOverImage}
                  onMouseOut={mouseOutImage}
                  alt={pokemon.name}
                  maxW="10rem"
                />
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
                  onClick={() => addItem(pokemon)}
                  variant="addToCart"
                  p="0"
                >
                  <AiOutlinePlus />
                </Button>
              </Flex>
              <SideCart isOpen={isOpen} placement="right" onClose={onClose} />
            </Box>
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default Cards;

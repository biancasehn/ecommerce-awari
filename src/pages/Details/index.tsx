import { useEffect, useState } from "react";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { api, apiUrl, sprite } from "../../services/api";
import { useStore } from "../../services/store";
import { DetailsBoard, SearchBar, SideCart } from "../../components";
import { useUpdateCart } from "../../hooks";
import { capitalizeFirstLetter } from "../../utils/strings";
import { PokeDetails } from "../../types";

const Details = () => {
  const { pokeId } = useParams();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [pokeDetails, setPokeDetails] = useState<PokeDetails>({
    id: 0,
    name: "",
    types: [],
    url: "",
    sprite: "",
    weight: 0,
    height: 0,
    abilities: [],
    price: 0,
  });

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { addItemToCart } = useUpdateCart(onOpen);
  const { totalNumberOfPokemons } = useStore();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLInputElement;
    if (!!pokeId) {
      if (target.name === "previous") {
        return navigate(`/details/${parseInt(pokeId) - 1}`);
      }
      return navigate(`/details/${parseInt(pokeId) + 1}`);
    }
  };

  useEffect(() => {
    const getPokemon = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/pokemon/${pokeId}`);
        setPokeDetails({
          id: parseInt(response.data.id),
          name: capitalizeFirstLetter(response.data.name),
          types: response.data.types,
          url: `${apiUrl}/pokemon/${response.data.id}`,
          sprite: `${sprite}/${pokeId}.png`,
          weight: response.data.weight,
          height: response.data.height,
          abilities: response.data.abilities,
          price: 10,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPokemon();
  }, [pokeId]);

  return (
    <Box p="16px">
      <SearchBar />
      <Flex align="center" justify="center">
        {pokeId && +pokeId > 1 && (
          <Button mr="10px" name="previous" onClick={handleClick}>
            {"<"}
          </Button>
        )}
        <DetailsBoard
          pokemon={pokeDetails}
          isLoading={isLoading}
          addItemToCart={addItemToCart}
        />
        {pokeId && +pokeId < totalNumberOfPokemons && (
          <Button ml="10px" name="next" onClick={(event) => handleClick(event)}>
            {">"}
          </Button>
        )}
      </Flex>
      <SideCart isOpen={isOpen} placement="right" onClose={onClose} />
    </Box>
  );
};

export default Details;

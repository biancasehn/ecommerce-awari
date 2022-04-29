import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { api, apiUrl, sprite } from "../../services/api";
import { PokeImage, SearchBar, SideCart } from "../../components";
import { useUpdateCart } from "../../hooks";
import { PokeDetails } from "../../types";
import { capitalizeFirstLetter } from "../../utils/strings";

const Details = () => {
  const { pokeId } = useParams();
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
  const { addItem } = useUpdateCart(onOpen);

  useEffect(() => {
    const getPokemon = async () => {
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
      }
    };
    getPokemon();
  }, []);

  return (
    <Box p="16px" maxH="80vh">
      <SearchBar />
      <Box fontSize="28px" fontWeight="semibold" p="16px">
        {pokeDetails.name}
      </Box>
      <Box borderWidth="1px" borderRadius="lg">
        <Flex align="center" justify="flex-start" gap="10%">
          <PokeImage pokemon={pokeDetails} hoverImage={false} size="350px" />
          <Flex direction="column" p="10px">
            <Box textAlign="center" mb="32px">
              <Box
                fontWeight="bold"
                fontSize="20px"
              >{`€ ${pokeDetails?.price},00`}</Box>
              <Button
                onClick={() => addItem(pokeDetails)}
                variant="addToCart"
                borderRadius="20px"
              >
                Add to cart
              </Button>
            </Box>
            <Grid gridTemplateColumns="1fr 1fr" gap="16px">
              <Box>
                <Box fontWeight="semibold">Type(s):</Box>
                <ul>
                  {pokeDetails?.types.map((item: any, index_type: number) => (
                    <p key={index_type}>{item.type.name}</p>
                  ))}
                </ul>
              </Box>
              <Box>
                <Box fontWeight="semibold">Abilities:</Box>
                {pokeDetails?.abilities.map(
                  (item: any, index_ability: number) => (
                    <p key={index_ability}>{item.ability.name}</p>
                  )
                )}
              </Box>
              <Flex>
                <Box fontWeight="semibold">Height:</Box>
                <p>{pokeDetails?.height / 10} m</p>
              </Flex>
              <Flex>
                <Box fontWeight="semibold">Weight:</Box>
                <p>{pokeDetails?.weight / 10} kg</p>
              </Flex>
            </Grid>
          </Flex>
        </Flex>
      </Box>
      <SideCart isOpen={isOpen} placement="right" onClose={onClose} />
    </Box>
  );
};

export default Details;

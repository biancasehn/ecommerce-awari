import { useEffect, useState } from "react";
import { Box, Button, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { api, apiUrl, sprite } from "../../services/api";
import { PokeImage, SideCart } from "../../components";
import { useUpdateCart } from "../../hooks/useUpdateCart";
import { PokeDetails } from "../../types";
import { capitalizeFirstLetter } from "../../utils/formatText";

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
      <Box fontSize="28px">
        <h1>{pokeDetails.name}</h1>
      </Box>
      <Flex align="start" justify="flex-start" gap="10%">
        <PokeImage pokemon={pokeDetails} hoverImage={false} size="350px" />
        <Flex direction="column" p="10px">
          <Box textAlign="center" mb="20px">
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
          <Box>
            <Box>
              Types:
              {pokeDetails?.types.map((item: any, index_type: number) => (
                <li key={index_type}>{item.type.name}</li>
              ))}
            </Box>
            <p>Height: {pokeDetails?.height / 10} m</p>
            <p>Weight: {pokeDetails?.weight / 10} kg</p>
            <p>Abilities: </p>
            {pokeDetails?.abilities.map((item: any, index_ability: number) => (
              <li key={index_ability}>{item.ability.name}</li>
            ))}
          </Box>
        </Flex>
      </Flex>
      <SideCart isOpen={isOpen} placement="right" onClose={onClose} />
    </Box>
  );
};

export default Details;

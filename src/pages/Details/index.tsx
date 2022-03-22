import { useEffect, useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { api } from "../../services/api";
import { AddToCartButton } from "../../components";
import { useParams } from "react-router-dom";
import { sprite } from "../../services/api";
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

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await api.get(`/pokemon/${pokeId}`);
        setPokeDetails({
          id: response.data.id,
          name: capitalizeFirstLetter(response.data.name),
          types: response.data.types,
          url: `${api}/pokemon/${response.data.id}`,
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
    <Box p={4}>
      <Box textAlign="center" fontSize="large">
        <h2>{pokeDetails.name}</h2>
      </Box>
      <Flex align="center" justify="center" gap="10%">
        <Image
          src={pokeDetails?.sprite}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = `${sprite}/0.png`;
          }}
          alt={pokeDetails.name}
          maxW="20rem"
        />
        <Box p="2em">
          {pokeDetails?.types.map((item: any, index_type: number) => (
            <li key={index_type}>{item.type.name}</li>
          ))}
          <p>Height: {pokeDetails?.height}</p>
          <p>Weight: {pokeDetails?.weight}</p>
          <p>Abilities: </p>
          {pokeDetails?.abilities.map((item: any, index_ability: number) => (
            <li key={index_ability}>{item.ability.name}</li>
          ))}
        </Box>
        <Box textAlign="center">
          <h3>{`€ ${pokeDetails?.price},00`}</h3>
          <AddToCartButton pokemon={pokeDetails} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Details;

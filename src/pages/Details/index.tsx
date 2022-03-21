import { useEffect, useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { api } from "../../services/api";
import { SideCart } from "../../components";
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
  });

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await api.get(`/pokemon/${pokeId}`);
        setPokeDetails({
          id: response.data.id,
          name: capitalizeFirstLetter(response.data.name),
          // response.data.name.charAt(0).toUpperCase() +
          // response.data.name.slice(1),
          types: response.data.types,
          url: `${api}/pokemon/${response.data.id}`,
          sprite: `${sprite}/${pokeId}.png`,
          weight: response.data.weight,
          height: response.data.height,
          abilities: response.data.abilities,
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
      </Flex>
      <SideCart />
    </Box>
  );
};

export default Details;

import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { PokeDetails } from "../types";
import { PokeImage } from "./";

interface IDetailsBord {
  pokemon: PokeDetails;
  addItemToCart: any;
}

const DetailsBoard = ({ pokemon, addItemToCart }: IDetailsBord) => {
  return (
    <Flex direction="column" minW="100%">
      <Box fontSize="28px" fontWeight="semibold" p="16px">
        {pokemon.name}
      </Box>
      <Box borderWidth="1px" borderRadius="lg">
        <Flex align="center" gap="3%" justify="space-around">
          <PokeImage pokemon={pokemon} hoverImage={false} size="350px" />
          <Flex direction="column" p="10px">
            <Box textAlign="center" mb="32px">
              <Box
                fontWeight="bold"
                fontSize="20px"
              >{`€ ${pokemon?.price},00`}</Box>
              <Button
                onClick={() => addItemToCart(pokemon)}
                variant="addToCart"
                borderRadius="20px"
              >
                Add to cart
              </Button>
            </Box>
            <Grid gridTemplateColumns="1fr 1fr" gap="16px">
              <Box>
                <Box fontWeight="semibold">Type(s):</Box>
                {pokemon?.types.map((item: any, index_type: number) => (
                  <Box
                    key={index_type}
                    bg={`type.${item.type.name}`}
                    textAlign="center"
                    border="1px solid lightGray"
                    borderRadius="10px"
                  >
                    {item.type.name}
                  </Box>
                ))}
              </Box>
              <Box>
                <Box fontWeight="semibold">Abilities:</Box>
                {pokemon?.abilities.map((item: any, index_ability: number) => (
                  <Box key={index_ability}>{item.ability.name}</Box>
                ))}
              </Box>
              <Flex>
                <Box fontWeight="semibold">Height:</Box>
                <p>{pokemon?.height / 10} m</p>
              </Flex>
              <Flex>
                <Box fontWeight="semibold">Weight:</Box>
                <p>{pokemon?.weight / 10} kg</p>
              </Flex>
            </Grid>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default DetailsBoard;

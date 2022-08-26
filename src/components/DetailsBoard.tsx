import {
  Box,
  Button,
  Flex,
  Grid,
  ListItem,
  Skeleton,
  Tag,
  UnorderedList,
} from "@chakra-ui/react";
import { PokeDetails } from "../types";
import { PokeImage } from "./";
import { pickTextColor } from "../utils/colors";
interface IDetailsBord {
  pokemon: PokeDetails;
  isLoading: Boolean;
  addItemToCart: any;
}

const DetailsBoard = ({ pokemon, isLoading, addItemToCart }: IDetailsBord) => {
  return (
    <Flex direction="column" minW="500px">
      <Skeleton isLoaded={!isLoading}>
        <Flex
          direction="column"
          align="center"
          padding={3}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
        >
          <Box fontWeight="semibold" fontSize="30px" pt={6}>
            {pokemon.name}
          </Box>
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
                {pokemon?.types.map((item: any, index: number) => (
                  <Box padding="2px">
                    <Tag
                      key={`${index}-type`}
                      variant="solid"
                      bg={`type.${item.type.name}`}
                      sx={{
                        color: pickTextColor(item.type.name),
                      }}
                    >
                      {item.type.name}
                    </Tag>
                  </Box>
                ))}
              </Box>
              <Box>
                <Box fontWeight="semibold">Abilities:</Box>
                <UnorderedList>
                  {pokemon?.abilities.map((item: any, index: number) => (
                    <ListItem key={`${index}-ability`}>
                      {item.ability.name}
                    </ListItem>
                  ))}
                </UnorderedList>
              </Box>
              <Flex direction="column">
                <Box fontWeight="semibold">{`Height: `}</Box>
                <p>{pokemon?.height / 10} m</p>
              </Flex>
              <Flex direction="column">
                <Box fontWeight="semibold">Weight:</Box>
                <p>{pokemon?.weight / 10} kg</p>
              </Flex>
            </Grid>
          </Flex>
        </Flex>
      </Skeleton>
    </Flex>
  );
};

export default DetailsBoard;

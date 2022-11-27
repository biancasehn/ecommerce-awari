import {
  Box,
  Button,
  Flex,
  ListItem,
  Skeleton,
  Tag,
  UnorderedList,
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
} from "@chakra-ui/react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { PokeDetails, Stats, Types, Abilities } from "../types";
import { PokeImage } from "./";
import { pickTextColor } from "../utils/colors";
interface IDetailsBord {
  pokemon: PokeDetails;
  isLoading: Boolean;
  addItemToCart: any;
}

const DetailsBoard = ({ pokemon, isLoading, addItemToCart }: IDetailsBord) => {
  const data = pokemon.stats?.map((stat: Stats) => {
    return {
      subject: stat.stat.name,
      stat: (stat.base_stat / 255) * 100,
      fullMark: 100,
    };
  });

  return (
    <Flex w="100vw" height="100vh" justify="center" align="center">
      <Skeleton isLoaded={!isLoading}>
        <Flex
          direction="column"
          align="center"
          padding={3}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
          borderRadius="lg"
        >
          <Box fontWeight="semibold" fontSize="30px" pt={6}>
            {pokemon.name}
          </Box>
          <PokeImage pokemon={pokemon} hoverImage={false} size="20vw" />
          <Flex
            direction="column"
            width="100%"
            alignItems="center"
            justifyContent="center"
            p="10px"
          >
            <Box textAlign="center" mb="32px" w="50%">
              <Box
                fontWeight="bold"
                fontSize="20px"
              >{`€ ${pokemon?.price},00`}</Box>
              <Button
                onClick={() => addItemToCart(pokemon)}
                variant="addToCart"
                borderRadius="10px"
                w="100%"
              >
                Add to cart
              </Button>
            </Box>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Type</Th>
                    <Th>Abilities</Th>
                    <Th isNumeric>Height</Th>
                    <Th isNumeric>Weight</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      {pokemon.types.map((item: Types, index) => (
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
                    </Td>
                    <Td>
                      <UnorderedList>
                        {pokemon?.abilities.map((item: any, index: number) => (
                          <ListItem key={`${index}-ability`}>
                            {item.ability.name}
                          </ListItem>
                        ))}
                      </UnorderedList>
                    </Td>
                    <Td isNumeric>{`${pokemon.height / 10} m`}</Td>
                    <Td isNumeric>{`${pokemon.weight / 10} kg`}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </Flex>
      </Skeleton>
      <RadarChart
        cx={300}
        cy={250}
        outerRadius={150}
        width={500}
        height={500}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis domain={[0, 100]} />
        <Radar
          name="Poke"
          dataKey="stat"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </Flex>
  );
};

export default DetailsBoard;

import { Box, Button, Flex } from "@chakra-ui/react";
import { useStore } from "../store";

function Pagination() {
  
  const { numberOfPokemons, currentPage, setCurrentPage } = useStore();

  const offsetSize = 6
  const offset = Math.floor(currentPage / offsetSize);
  const PokesPerPage = 20;
  const pageNumbers = [];

  for (
    let index = 1;
    index <= Math.ceil(numberOfPokemons / PokesPerPage);
    index++
  ) {
    pageNumbers.push(index);
  }

  console.log(currentPage)

  return (
    numberOfPokemons < 20 ? null : (

    <Flex align="center" justify="center">
      {offset >= 1 && (
        <Flex align="center" gap={4}>
          <Button
            variant="ghost"
            onClick={() => {
              setCurrentPage((offset - 1) * offsetSize + (offsetSize - 1));
            }}
          >
            Previous
          </Button>
          <Button onClick={() => setCurrentPage(0)}>1</Button>
          <p>...</p>
        </Flex>
      )}

      {pageNumbers.slice(offset * offsetSize, offset * offsetSize + offsetSize).map((number) => (
        <Box p={2} key={number}>
          <Button onClick={() => setCurrentPage(number - 1)} bg={currentPage == number - 1 ? 'red' : 'white'}>{number}</Button>
        </Box>
      ))}

      {offset * offsetSize + offsetSize < pageNumbers.length && (
        <Flex align="center" gap={4}>
          <p>...</p>
          <Button onClick={() => setCurrentPage(pageNumbers.length - 1)}>
            {pageNumbers.length}
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setCurrentPage((offset + 1) * offsetSize);
            }}
          >
            Next
          </Button>
        </Flex>
      )}
    </Flex>
    )
  );
}

export default Pagination;

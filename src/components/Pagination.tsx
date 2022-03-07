import { useMemo } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useStore } from "../store";

const offsetSize = 6;
const pokesPerPage = 20;
let pageNumbers: number[];

function Pagination() {
  const { currentNumberOfPokemons, currentPage, setCurrentPage } = useStore();
  const offset = useMemo(
    () => Math.floor(currentPage / offsetSize),
    [currentPage]
  );

  useMemo(() => {
    pageNumbers = [];
    for (
      let index = 1;
      index <= Math.ceil(currentNumberOfPokemons / pokesPerPage);
      index++
    ) {
      pageNumbers.push(index);
    }
  }, [currentNumberOfPokemons]);

  return currentNumberOfPokemons < 20 ? null : (
    <Flex align="center" justify="center" p="20px">
      <Flex align="center" gap={2}>
        {currentPage + 1 != 1 && (
          <Button
            variant="ghost"
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          >
            {"<"}
          </Button>
        )}
        {offset >= 1 && (
          <>
            <Button
              onClick={() => setCurrentPage(0)}
              bg={currentPage == 0 ? "#EDF2F7" : "white"}
              borderRadius="50%"
            >
              1
            </Button>
            <p>...</p>
          </>
        )}
      </Flex>

      {pageNumbers
        .slice(offset * offsetSize, offset * offsetSize + offsetSize)
        .map((number) => (
          <Box p={1} key={number}>
            <Button
              onClick={() => setCurrentPage(number - 1)}
              bg={currentPage == number - 1 ? "#EDF2F7" : "white"}
              borderRadius="50%"
            >
              {number}
            </Button>
          </Box>
        ))}

      <Flex align="center" gap={2}>
        {offset * offsetSize + offsetSize < pageNumbers.length && (
          <>
            <p>...</p>
            <Button
              onClick={() => setCurrentPage(pageNumbers.length - 1)}
              bg={currentPage == pageNumbers.length - 1 ? "#EDF2F7" : "white"}
              borderRadius="50%"
            >
              {pageNumbers.length}
            </Button>
          </>
        )}
        {currentPage + 1 < pageNumbers.length && (
          <Button
            variant="ghost"
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            {">"}
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default Pagination;

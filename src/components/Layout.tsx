import { Box, Flex } from "@chakra-ui/react";
import { Header, SearchBar } from "./";

const Layout: React.FC<any> = ({ children }) => (
  <Box>
    <Header />
    <Flex justify="center">
      <Box w="70vw">
        <SearchBar />
        {children}
      </Box>
    </Flex>
  </Box>
);

export default Layout;

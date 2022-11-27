import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { Header } from "./";

const Layout: React.FC<any> = () => (
  <>
    <Header />
    <Flex justify="center">
      <Box w="70vw">
        <Outlet />
      </Box>
    </Flex>
  </>
);

export default Layout;

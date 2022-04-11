import { Link } from "react-router-dom";
import { Flex, Box, Image } from "@chakra-ui/react";
import logo from "../assets/images/logo.png";

function Header(props: any) {
  return (
    <Box
      p={4}
      pr="5em"
      pl="5em"
      color="darkText"
      bgGradient="linear(90deg, header.orange 18%, header.lightYellow 50%, header.darkYellow  100%)"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
    >
      <Flex align="center" justify="space-between">
        <Link to="/">
          <Image src={logo} w="8em" alt="logo" />
        </Link>
        <Flex fontWeight="bold">
          <Box p={3}>
            <Link to="/">HOME</Link>
          </Box>
          <Box p={3}>
            <Link to="/cart">CART</Link>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;

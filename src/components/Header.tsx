import { Link } from "react-router-dom";
import { Flex, Box, Image } from "@chakra-ui/react";
import logo from "../assets/images/logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useStore } from "../services/store";

function Header() {
  const { cartItems } = useStore();
  const countCartItems = cartItems.reduce((acc, item) => {
    return acc + item.count;
  }, 0);

  return (
    <Box
      p="10px 50px"
      color="darkText"
      bgGradient="linear(90deg, header.orange 18%, header.lightYellow 50%, header.darkYellow  100%)"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
    >
      <Flex align="center" justify="space-between">
        <Link to="/">
          <Image src={logo} w="8em" alt="logo" />
        </Link>
        <Flex p={3} position="relative">
          <Link to="/cart">
            <AiOutlineShoppingCart size="40px" />
            <Box
              width="20px"
              height="20px"
              position="absolute"
              right="0"
              bottom="0"
              bg="button.green"
              borderRadius="50%"
              textAlign="center"
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
            >
              <Box fontSize="14px" color="whiteText">
                {countCartItems}
              </Box>
            </Box>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;

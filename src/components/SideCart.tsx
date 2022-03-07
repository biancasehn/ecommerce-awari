import { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useStore } from "../store";
import { Link } from "react-router-dom";
import InputCountItem from "./InputCountItem";

const SideCart: React.FC<any> = ({ isOpen, placement, onClose }) => {
  const { cartItems } = useStore();
  const [inputCount, setInputCount] = useState(0);

  console.log(cartItems);
  return (
    <>
      <Drawer isOpen={isOpen} placement={placement} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>

          <DrawerBody>
            <Flex
              minHeight="100% "
              flexDirection="column"
              justify="space-between"
            >
              <Box>
                {cartItems?.map((item) => (
                  <Flex
                    key={`${item.count}_${item.name}`}
                    justify="flex-start"
                    align="center"
                    gap="15px"
                    maxW="fit-content"
                    paddingBottom="10px"
                  >
                    <InputCountItem pokemon={item} />
                    <Box>{item.name.toUpperCase()}</Box>
                  </Flex>
                ))}
              </Box>
              <Flex fontWeight="bold">Total:</Flex>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Link to="/cart">
              <Button colorScheme="blue">Check Out</Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default SideCart;

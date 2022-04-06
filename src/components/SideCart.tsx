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
import { useStore } from "../services/store";
import { Link } from "react-router-dom";
import InputCountItem from "./InputCountItem";
import { calculateTotal } from "../utils/calcs";
import { capitalizeFirstLetter } from "../utils/formatText";

const SideCart: React.FC<any> = ({ isOpen, placement, onClose }) => {
  const { cartItems } = useStore();

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
                    justify="space-between"
                    align="center"
                    gap="15px"
                    paddingBottom="10px"
                  >
                    <InputCountItem pokemon={item} />
                    <Box>{capitalizeFirstLetter(item.name)}</Box>
                    <Box>{`€ ${item.price},00`}</Box>
                  </Flex>
                ))}
              </Box>
              <Flex fontWeight="bold">
                {`TOTAL: € ${calculateTotal(cartItems)},00`}
              </Flex>
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

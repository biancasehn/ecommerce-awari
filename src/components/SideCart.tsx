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
import { capitalizeFirstLetter } from "../utils/strings";
import { AiOutlineDelete } from "react-icons/ai";
import { useUpdateCart } from "../hooks/useUpdateCart";

const SideCart: React.FC<any> = ({ isOpen, placement, onClose }) => {
  const { cartItems } = useStore();
  const { removeItem } = useUpdateCart();
  return (
    <>
      <Drawer isOpen={isOpen} placement={placement} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>

          <DrawerBody>
            <Flex
              minHeight="100%"
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
                    fontSize="14px"
                  >
                    <Box
                      w="5%"
                      cursor="pointer"
                      color="red"
                      onClick={() => removeItem(item)}
                    >
                      <AiOutlineDelete />
                    </Box>
                    <Box w="35%">
                      <InputCountItem pokemon={item} />
                    </Box>
                    <Box w="40%">{capitalizeFirstLetter(item.name)}</Box>
                    <Box w="20%">{`€${item.price},00`}</Box>
                  </Flex>
                ))}
              </Box>
              <Flex fontWeight="bold">
                {`TOTAL: € ${calculateTotal(cartItems)},00`}
              </Flex>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              borderRadius="10px"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Link to="/cart">
              <Button variant="addToCart" borderRadius="10px">
                Check Out
              </Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default SideCart;

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
  Input,
} from "@chakra-ui/react";
import { useStore } from "../store";

const SideCart: React.FC<any> = ({ isOpen, placement, onClose }) => {
  const { cartItems } = useStore();
  const [countChange, setCountChange] = useState("");

  const handleCountChange = (pokeName, e) => {
    const target = e.target;
    setCountChange(target.value);
    cartItems.map((item) => {
      if (item.name === pokeName) {
        (item.count = target.value);
      }
    setCountChange('');

      return item;
    });
  };

  console.log("count change", countChange)

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
                  >
                    <Box>{item.name}</Box>
                    <Input
                      type="number"
                      name="itemCount"
                      value={!countChange ? item.count : countChange}
                      onChange={(e) => handleCountChange(item.name, e)}
                    />
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
            <Button colorScheme="blue">Check Out</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default SideCart;

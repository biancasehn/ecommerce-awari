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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useStore } from "../store";
import { Pokemon } from "../types";

const SideCart: React.FC<any> = ({ isOpen, placement, onClose }) => {
  const { cartItems } = useStore();
  const [inputCount, setInputCount] = useState(0);

  const handleCountChange = (pokemon: Pokemon, event: number) => {
    setInputCount(event);
    cartItems.map((item) => {
      if (item.name === pokemon.name) {
        item.count = event;
      }
    });
  };

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
                    <NumberInput
                      value={item.count}
                      onChange={(event) =>
                        handleCountChange(item, Number(event))
                      }
                      min={1}
                      max={10000}
                      maxW="30%"
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

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
            <Button colorScheme="blue">Check Out</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default SideCart;

import { Box, Flex, Image } from "@chakra-ui/react";
import InputCountItem from "../../components/InputCountItem";
import { useStore } from "../../store";
import { calculateTotal } from "../../hooks";

const Cart = () => {
  const { cartItems } = useStore();

  return (
    <Box p={4}>
      {cartItems.map((item) => (
        <Flex
          justify="space-between"
          align="center"
          gap={4}
          borderWidth="1px"
          borderRadius="lg"
          p={2}
        >
          <Flex align="center" gap={4}>
            <Image src={item.sprite} alt={item.name} maxW="5rem" />
            <InputCountItem pokemon={item} />
            <Box>{item.name.toUpperCase()}</Box>
          </Flex>
          <Box>{`€ ${item.price},00`}</Box>
        </Flex>
      ))}
      <Box textAlign="end" p={4} fontWeight="bold">
        {`TOTAL: € ${calculateTotal(cartItems)},00`}
      </Box>
    </Box>
  );
};

export default Cart;

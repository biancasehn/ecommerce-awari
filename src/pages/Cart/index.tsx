import { Box, Flex, Image } from "@chakra-ui/react";
import InputCountItem from "../../components/InputCountItem";
import { sprite } from "../../services/api";
import { useStore } from "../../store";
import { calculateTotal } from "../../utils/calcs";
import { capitalizeFirstLetter } from "../../utils/formatText";

const Cart = () => {
  const { cartItems } = useStore();

  return (
    <Box p={4}>
      {!cartItems.length ? (
        <Box p="20px" textAlign="center" fontWeight="bold">
          There are no items in the cart yet
        </Box>
      ) : (
        <Box>
          {cartItems.map((item) => (
            <Flex
              key={item.id}
              justify="space-between"
              align="center"
              gap={4}
              p={2}
              borderWidth="1px"
              borderRadius="lg"
            >
              <Flex align="center" gap={4}>
                <Image
                  src={item.sprite}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = `${sprite}/0.png`;
                  }}
                  alt={item.name}
                  maxW="5rem"
                />
                <InputCountItem pokemon={item} />
                <Box>{capitalizeFirstLetter(item.name)}</Box>
              </Flex>
              <Box>{`€ ${item.price},00`}</Box>
            </Flex>
          ))}
          <Box textAlign="end" p={4} fontWeight="bold">
            {`TOTAL: € ${calculateTotal(cartItems)},00`}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Cart;

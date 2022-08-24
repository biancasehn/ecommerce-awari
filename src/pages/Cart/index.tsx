import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Helmet, InputCountItem, PokeImage } from "../../components";
import { sprite } from "../../services/api";
import { useStore } from "../../services/store";
import { calculateTotal } from "../../utils/calcs";
import { capitalizeFirstLetter } from "../../utils/strings";
import { AiOutlineDelete } from "react-icons/ai";
import { useUpdateCart } from "../../hooks";

const Cart = () => {
  const { cartItems } = useStore();
  let navigate = useNavigate();
  const { removeItem } = useUpdateCart();

  return (
    <>
      <Helmet path={`Shopping cart`} />
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
                  <PokeImage pokemon={item} hoverImage={false} size="5rem" />
                  <InputCountItem pokemon={item} />
                  <Box
                    cursor="pointer"
                    color="red"
                    onClick={() => removeItem(item)}
                  >
                    <AiOutlineDelete />
                  </Box>
                  <Box>{capitalizeFirstLetter(item.name)}</Box>
                </Flex>
                <Box>{`€ ${item.price},00`}</Box>
              </Flex>
            ))}
            <Flex direction="column" align="end" p={4} fontWeight="bold">
              <Box textAlign="center">
                <Box textAlign="right">{`TOTAL: € ${calculateTotal(
                  cartItems
                )},00`}</Box>
                <Button
                  width="100%"
                  type="submit"
                  variant="addToCart"
                  borderRadius="0"
                  onClick={() => navigate("/checkout")}
                >
                  Buy
                </Button>
              </Box>
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Cart;

import { useEffect } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../services/store";

const CheckoutSuccess = () => {
  const { userData } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("items");
  }, []);

  return (
    <Flex direction="column" align="center">
      <Box p="50px" fontSize="20px" fontWeight="semibold">
        Thank you for your purchase, {userData.name}!
      </Box>
      <Button
        variant="solid"
        fontWeight="normal"
        borderRadius="0"
        onClick={() => navigate("/", { replace: true })}
      >
        Back to Home page
      </Button>
    </Flex>
  );
};

export default CheckoutSuccess;

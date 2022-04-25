import { Box, Flex } from "@chakra-ui/react";
import { Form } from "../../components";

const Register = () => {
  return (
    <Flex direction="column" align="center">
      <Box fontSize="28px" textAlign="center" p="16px">
        Register
      </Box>
      <Form />
    </Flex>
  );
};

export default Register;

import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Form } from "../../components";

const Login = () => {
  return (
    <Flex direction="column" align="center">
      <Box fontSize="28px" textAlign="center" p="20px">
        Login
      </Box>
      <Box fontWeight="semibold" textDecor="underline" color="textLink">
        <Link to="/register">Or register</Link>
      </Box>
      <Form />
    </Flex>
  );
};

export default Login;

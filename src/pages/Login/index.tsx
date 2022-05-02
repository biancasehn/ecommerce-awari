import { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../../components";
import { useAuth } from "../../hooks";

const Login = () => {
  const { verifyUserAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const isVerified = async () => {
      try {
        await verifyUserAuth();
        return navigate("/");
      } catch (error) {
        console.log(error);
        return;
      }
    };
    isVerified();
  }, []);

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

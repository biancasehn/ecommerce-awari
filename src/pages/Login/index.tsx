import { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet, Form } from "../../components";
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
    <>
      <Helmet path={`Login`} />
      <Flex direction="column" align="center">
        <Form />
        <Box fontWeight="semibold" textDecor="underline" color="textLink">
          <Link to="/register">Or register</Link>
        </Box>
      </Flex>
    </>
  );
};

export default Login;

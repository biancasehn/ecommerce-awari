import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, Form } from "../../components";
import { useAuth } from "../../hooks";

const Register = () => {
  const navigate = useNavigate();
  const { verifyUserAuth } = useAuth();

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
      <Helmet path={"Register"} />
      <Flex direction="column" align="center">
        <Form />
      </Flex>
    </>
  );
};

export default Register;

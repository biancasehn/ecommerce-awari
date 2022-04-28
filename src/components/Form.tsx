import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useForm } from "../hooks/useForm";

const Form = () => {
  const { pathname } = useLocation();
  const { handleInputChange, input, handleSubmit, isError, errorMessage } =
    useForm();

  return (
    <Box maxW="50vw" p="20px">
      <FormControl isInvalid={isError}>
        <form onSubmit={(event) => handleSubmit(event, pathname)}>
          {pathname === "/register" && (
            <>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <Input
                id="name"
                type="name"
                value={input.name}
                onChange={handleInputChange}
              />
            </>
          )}
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            value={input.email}
            onChange={handleInputChange}
          />
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={input.password}
            onChange={handleInputChange}
          />
          {isError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
          <Box p="16px" textAlign="center">
            <Button type="submit" variant="submit">
              Submit
            </Button>
          </Box>
        </form>
      </FormControl>
    </Box>
  );
};

export default Form;

import { Box } from "@chakra-ui/react";

interface IHelmet {
  path: string;
}
const Helmet = ({ path }: IHelmet) => {
  return (
    <Box fontSize="28px" p="20px">
      {path}
    </Box>
  );
};

export default Helmet;

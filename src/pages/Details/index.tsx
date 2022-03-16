import { Box } from "@chakra-ui/react";
import { useStore } from "../../store";
import { SideCart } from "../../components";
import { useParams } from "react-router-dom";

const Details = () => {
  const params = useParams();
  return (
    <Box p={4}>
      <SideCart />
    </Box>
  );
};

export default Details;

import { MouseEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { Box, Image, Spinner } from "@chakra-ui/react";
import { sprite } from "../services/api";
import { getIdFromUrl } from "../utils/urls";

const PokeImage = ({ pokemon, hoverImage, size }: any) => {
  const refPlaceholder: any = useRef();

  let navigate = useNavigate();

  const removePlaceholder = () => {
    refPlaceholder.current.remove();
  };

  const mouseOverImage = (event: MouseEvent<HTMLElement>) => {
    if (!hoverImage) return;
    event.currentTarget.style.transition = "all 300ms ease";
    event.currentTarget.style.transform = "scale(1.1)";
  };

  const mouseOutImage = (event: MouseEvent<HTMLElement>) => {
    if (!hoverImage) return;
    event.currentTarget.style.transform = "scale(1)";
  };

  return (
    <>
      <LazyLoad>
        <Image
          src={`${sprite}/${getIdFromUrl(pokemon.url)}.png`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = `${sprite}/0.png`;
          }}
          onClick={() => navigate(`/details/${getIdFromUrl(pokemon.url)}`)}
          onMouseOver={mouseOverImage}
          onMouseOut={mouseOutImage}
          onLoad={removePlaceholder}
          alt={pokemon.name}
          maxW={size}
        />
      </LazyLoad>
      <Box p={4} ref={refPlaceholder}>
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="gray.200"
          color="lightGray"
          size="xl"
          padding={2}
        />
      </Box>
    </>
  );
};

export default PokeImage;

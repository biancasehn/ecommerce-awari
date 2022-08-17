import { MouseEvent, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { Box, Image, Spinner } from "@chakra-ui/react";
import { Pokemon } from "../types";
import { sprite } from "../services/api";
import { getIdFromUrl } from "../utils/urls";

const PokeImage = ({ pokemon, hoverImage, size }: any) => {
  const [imageLoading, setImageLoading] = useState(true);
  const refPlaceholder: any = useRef();
  const pokeModel: Pokemon = {
    id: pokemon.id || getIdFromUrl(pokemon.url),
    name: pokemon.name,
    url: pokemon.sprite || `${sprite}/${getIdFromUrl(pokemon.url)}.png`,
    sprite: sprite,
  };

  let navigate = useNavigate();

  useMemo(() => {
    if (!imageLoading) return refPlaceholder.current.remove();
  }, [imageLoading]);

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
          src={pokeModel.url}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = `${pokeModel.sprite}/0.png`;
          }}
          onClick={() => navigate(`/details/${pokeModel.id}`)}
          onMouseOver={mouseOverImage}
          onMouseOut={mouseOutImage}
          onLoad={() => setImageLoading(false)}
          style={imageLoading ? { display: "none" } : {}}
          cursor="pointer"
          alt={pokeModel.name}
          maxW={size}
        />
      </LazyLoad>
      <Box p={4} height={size} ref={refPlaceholder}>
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

import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import { sprite } from "../services/api";
import { getIdFromUrl } from "../utils/getIdFromUrl";

const PokeImage = ({ pokemon, hoverImage, size }: any) => {
  let navigate = useNavigate();

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
    <Image
      src={`${sprite}/${getIdFromUrl(pokemon.url)}.png`}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = `${sprite}/0.png`;
      }}
      onClick={() => navigate(`/details/${getIdFromUrl(pokemon.url)}`)}
      onMouseOver={mouseOverImage}
      onMouseOut={mouseOutImage}
      alt={pokemon.name}
      maxW={size}
    />
  );
};

export default PokeImage;

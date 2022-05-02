import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useUpdateCart } from "../hooks";
import { Cart } from "../types";

const InputCountItem: React.FC<{ pokemon: Cart }> = ({ pokemon }) => {
  const { addItemToCart } = useUpdateCart();
  const handleCountChange = (pokemon: Cart, event: number) => {
    addItemToCart(pokemon, event);
  };

  return (
    <NumberInput
      value={pokemon.count}
      onChange={(event) => handleCountChange(pokemon, Number(event))}
      min={1}
      max={99}
      maxW="100px"
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default InputCountItem;

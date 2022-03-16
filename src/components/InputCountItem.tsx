import { useState } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useStore } from "../store";
import { Pokemon } from "../types";

const InputCountItem: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const [inputCount, setInputCount] = useState(0);
  const { cartItems, increaseItemCount } = useStore();

  const handleCountChange = (pokemon: Pokemon, event: number) => {
    setInputCount(event);
    cartItems.map((item) => {
      if (item.name === pokemon.name) {
        increaseItemCount(
          cartItems.map((item) =>
            item.name === pokemon.name
              ? {
                  ...item,
                  count: event,
                  price: event * 10,
                }
              : item
          )
        );
      }
    });
  };

  return (
    <NumberInput
      value={pokemon.count}
      onChange={(event) => handleCountChange(pokemon, Number(event))}
      min={1}
      max={10000}
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
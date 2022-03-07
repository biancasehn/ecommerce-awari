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

const InputCountItem = ({ pokemon }) => {
  const [inputCount, setInputCount] = useState(0);
  const { cartItems } = useStore();

  console.log(pokemon);

  const handleCountChange = (pokemon: Pokemon, event: number) => {
    setInputCount(event);
    cartItems.map((item) => {
      if (item.name === pokemon.name) {
        item.count = event;
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

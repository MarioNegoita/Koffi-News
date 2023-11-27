import React from "react";
import GuessSquare from "./GuessSquare";
import { Box, HStack, Text } from "native-base";

const GuessRow = ({ guess, word, guessed }) => {
  const letters = guess.split("");
  return (
    <HStack flex={1} p={2}>
      <GuessSquare index={0} guess={guess} word={word} guessed={guessed} />
      <GuessSquare index={1} guess={guess} word={word} guessed={guessed} />
      <GuessSquare index={2} guess={guess} word={word} guessed={guessed} />
      <GuessSquare index={3} guess={guess} word={word} guessed={guessed} />
      <GuessSquare index={4} guess={guess} word={word} guessed={guessed} />
    </HStack>
  );
};

export default GuessRow;

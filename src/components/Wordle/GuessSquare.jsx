import { View, Text } from "react-native";
import React from "react";
import { Box, Center, Heading } from "native-base";

const GuessSquare = ({ index, guess, word, guessed }) => {
  const letter = guess[index];
  const wordLetter = word[index];
  const guessedLetterColor = "background.500";
  const guessedBlockColor = "success.500";
  const guessInWordColor = "yellow.500";
  const guessNotInWordColor = "accent.500";

  const blockColor = () => {
    if (letter == wordLetter && guessed) {
      return guessedBlockColor;
    } else if (word.includes(letter) && guessed) {
      return guessInWordColor;
    } else if (guessed) {
      return guessNotInWordColor;
    }
    return "background.500";
  };

  const letterColor = () => {
    if (letter == wordLetter && guessed) {
      return guessedLetterColor;
    } else if (word.includes(letter) && guessed) {
      return guessedLetterColor;
    } else if (guessed) {
      return "background.500";
    }
    return "primaryText.500";
  };

  return (
    <Center
      flex={1}
      aspectRatio={1} // Maintain aspect ratio
      borderColor="button.500"
      borderWidth={2}
      m={2}
      bg={blockColor()}
    >
      <Heading color={letterColor()}>{letter}</Heading>
    </Center>
  );
};

export default GuessSquare;

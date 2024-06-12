import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Icon,
  Center,
  useToast,
  HStack,
  Heading,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import GuessRow from "../components/Wordle/GuessRow";
import Keyboard from "../components/Wordle/Keyboard";
import YouWinModal from "../components/Wordle/YouWinModal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef } from "react";

const ErrorToast = ({ errorMsg }) => {
  return (
    <Box bg="accent.500" px="2" py="1" rounded="sm" mb={5}>
      <Text fontSize="lg" color="background.500">
        {errorMsg}
      </Text>
    </Box>
  );
};

const words = [
  "LIGHT",
  "WRUNG",
  "COULD",
  "PERKY",
  "MOUNT",
  "WHACK",
  "SUGAR",
  "TIGHT",
  "GOING",
]; //-> List of words

const defaultGuess = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
};

const WordlePage = ({ navigation }) => {
  const [activeWord, setActiveWord] = useState(""); // -> Word that needs to be guessed
  const [guessIndex, setGuessIndex] = useState(0);
  const [guesses, setGuesses] = useState(defaultGuess);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [gameState, setGameState] = useState("playing");
  const toast = useToast();

  useEffect(() => {
    const getActiveWord = async () => {
      const word = await AsyncStorage.getItem("wordleWord");
      setActiveWord(word.toUpperCase());
    };
    getActiveWord();
  }, []);

  const resetGame = () => {
    setGameState("playing");
    setGuessIndex(0);
    setGuesses(defaultGuess);
    setIsGameFinished(false);
  };

  const handleKeyPress = (letter) => {
    const guess = guesses[guessIndex];

    toast.closeAll();
    if (letter === "SUBMIT") {
      if (guess.length !== 5) {
        toast.show({
          render: () => <ErrorToast errorMsg="Word is too short!" />,
          placement: "top",
        });
        return;
      }

      // if (!words.includes(guess)) {
      //   toast.show({
      //     render: () => <ErrorToast errorMsg="Not a valid word!" />,
      //     placement: "top",
      //   });
      //   return;
      // }

      if (guess === activeWord) {
        setGuessIndex(guessIndex + 1);
        setGameState("win");
        setIsGameFinished(true);
        return;
      }

      if (guessIndex < 4) {
        setGuessIndex(guessIndex + 1);
      } else {
        setGameState("lost");
        setIsGameFinished(true);
        return;
      }
    }

    if (letter == "⌫") {
      setGuesses({ ...guesses, [guessIndex]: guess.slice(0, -1) });
      return;
    }

    if (guess.length >= 5) {
      return;
    }

    setGuesses({ ...guesses, [guessIndex]: guess + letter });
  };

  return (
    <Box safeArea flex={1} bg="background.500">
      <YouWinModal
        showModal={isGameFinished}
        word={activeWord}
        gameState={gameState}
        resetGame={resetGame}
      />
      <HStack mt={2} width="100%" p={1} justifyContent="space-around">
        <Box>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon
              color="button.500"
              as={<Ionicons name={"chevron-back"} />}
              size="3xl"
            />
          </TouchableOpacity>
        </Box>
        <Heading>WORDLE</Heading>
        <Box>
          <TouchableOpacity
            onPress={() => {
              /* GO TO RULES*/
            }}
          >
            <Icon
              color="button.500"
              as={<Ionicons name={"bulb"} />}
              size="2xl"
            />
          </TouchableOpacity>
        </Box>
      </HStack>
      <Center flex={2}>
        <GuessRow
          guess={guesses[0]}
          word={activeWord}
          guessed={guessIndex > 0}
        />
        <GuessRow
          guess={guesses[1]}
          word={activeWord}
          guessed={guessIndex > 1}
        />
        <GuessRow
          guess={guesses[2]}
          word={activeWord}
          guessed={guessIndex > 2}
        />
        <GuessRow
          guess={guesses[3]}
          word={activeWord}
          guessed={guessIndex > 3}
        />
        <GuessRow
          guess={guesses[4]}
          word={activeWord}
          guessed={guessIndex > 4}
        />
      </Center>
      <Center flex={1}>
        <Keyboard onKeyPress={handleKeyPress} />
      </Center>
    </Box>
  );
};

export default WordlePage;

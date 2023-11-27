import { TouchableOpacity } from "react-native";
import React from "react";
import { Box, HStack, Text, Center } from "native-base";

const KeyboardRow = ({ letters, onKeyPress }) => {
  return (
    <HStack width={"100%"} space={0.5} mt={2}>
      {letters.map((letter, index) => (
        <TouchableOpacity
          key={index}
          style={{ width: "9%" }}
          onPress={() => {
            onKeyPress(letter);
          }}
        >
          <Box
            aspectRatio={0.8} // Maintain aspect ratio
            borderColor="button.500"
            borderWidth={2}
            borderRadius="md"
            justifyContent="center"
            alignItems="center"
            bg="coffee.500"
          >
            <Text color="button.500">{letter}</Text>
          </Box>
        </TouchableOpacity>
      ))}
    </HStack>
  );
};

const Keyboard = ({ onKeyPress }) => {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["Z", "X", "C", "V", "B", "N", "M", "⌫"];

  return (
    <Center flex={1}>
      <KeyboardRow letters={row1} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row2} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row3} onKeyPress={onKeyPress} />
      <TouchableOpacity
        onPress={() => {
          onKeyPress("SUBMIT");
        }}
      >
        <Box
          mt={2}
          borderColor="button.500"
          borderWidth={2}
          borderRadius="md"
          justifyContent="center"
          alignItems="center"
          bg="coffee.500"
          p={1}
        >
          <Text color="button.500">SUBMIT</Text>
        </Box>
      </TouchableOpacity>
    </Center>
  );
};

export default Keyboard;

import React from "react";
import { Box, Text, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

const WordleCard = () => {
  const navigation = useNavigation();
  return (
    <Box width="95%" p="5" bg="button.500" mt={5} borderRadius="xl">
      <Text
        fontSize={{
          sm: "md",
          md: "xl",
          lg: "xl",
        }}
        fontWeight="600"
        color="coffee.500"
        textAlign="left"
      >
        Feeling a bit overwhelmed with news updates? Take a break, try today's
        game of Wordle and refresh your mind.
      </Text>
      <Button
        backgroundColor="coffee.500"
        rounded="xl"
        _pressed={{
          opacity: 0.5, // Opacity when pressed
        }}
        onPress={() => {
          navigation.push("Wordle");
        }}
        mt={5}
      >
        <Text color="button.500" fontSize="lg" fontWeight="semibold">
          Play!
        </Text>
      </Button>
    </Box>
  );
};

export default WordleCard;

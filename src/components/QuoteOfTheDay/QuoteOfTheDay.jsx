import React from "react";
import { Box, Heading, Text } from "native-base";

const QuoteOfTheDay = ({ quote }) => {
  return (
    <Box
      bg="button.500"
      p={5}
      width="95%"
      borderRadius="xl"
      mt={5}
      minW="95%"
      maxW="95%"
    >
      <Heading
        fontSize={{
          sm: "md",
          md: "xl",
          lg: "xl",
        }}
        fontWeight="600"
        color="coffee.500"
        textAlign="left"
        italic
      >
        📖 "{quote[0]?.quote}" {"\n"}
      </Heading>
      <Text
        fontSize={{
          sm: "md",
          md: "xl",
          lg: "xl",
        }}
        fontWeight="600"
        color="coffee.500"
        textAlign="right"
      >
        -{quote[0]?.author}
      </Text>
    </Box>
  );
};

export default QuoteOfTheDay;

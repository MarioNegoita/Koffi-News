import React from "react";
import { Box, Heading, Text } from "native-base";

const FunFactsCard = ({ funFacts }) => {
  return (
    <Box p={5} mt="5" bg="button.500" borderRadius="xl" width="95%">
      <Heading
        fontSize={{
          sm: "xl",
          md: "2xl",
          lg: "2xl",
        }}
        fontWeight="bold"
        color="coffee.500"
        textAlign="left"
        mb={5}
      >
        Fact Fiesta 💃🏽
      </Heading>
      {funFacts?.map((fact, index) => (
        <Box key={index}>
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
            -{fact.fact}
            {"\n"}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default FunFactsCard;

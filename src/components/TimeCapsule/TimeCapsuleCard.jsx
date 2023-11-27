import { Dimensions } from "react-native";
import React from "react";

import { Box, Heading, Text, Image } from "native-base";

const TimeCapsuleCard = ({ timeCapsuleText }) => {
  const today = new Date();
  const currentMonth = today.toLocaleDateString("en-us", { month: "long" });
  const currentDay = today.getDate();

  const getOrdinal = (n) => {
    let ord = "th";

    if (n % 10 == 1 && n % 100 != 11) {
      ord = "st";
    } else if (n % 10 == 2 && n % 100 != 12) {
      ord = "nd";
    } else if (n % 10 == 3 && n % 100 != 13) {
      ord = "rd";
    }
    return ord;
  };

  return (
    <Box width="95%" p={5} mt="5" bg="button.500" borderRadius="xl">
      <Heading
        fontSize={{
          sm: "xl",
          md: "2xl",
          lg: "2xl",
        }}
        fontWeight="bold"
        color="coffee.500"
        textAlign="center"
      >
        Today's Time Capsule
      </Heading>

      <Image
        source={{
          uri: "https://i.pinimg.com/236x/57/25/c9/5725c973d6320ddd6d4cec41d9edb7aa.jpg",
        }}
        alt="image"
        width={Dimensions.get("window").width * 0.9}
        height={((Dimensions.get("window").width * 0.9) / 16) * 9}
        marginY="5"
        borderRadius="xl"
      />
      <Heading
        mb={2}
        fontSize={{
          sm: "md",
          md: "xl",
          lg: "xl",
        }}
        fontWeight="bold"
        color="coffee.500"
        textAlign="center"
      >
        On the {currentDay}
        {getOrdinal(currentDay)} of {currentMonth}
      </Heading>
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
        {timeCapsuleText}
      </Text>
    </Box>
  );
};

export default TimeCapsuleCard;

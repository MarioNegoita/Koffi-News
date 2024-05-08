import React from "react";
import { Box, Button, HStack, Select, Text } from "native-base";
import { TouchableOpacity } from "react-native";

const SortBy = ({ sortBy, setSortBy }) => {
  return (
    <Box mt={5} p={2}>
      <Text
        color="primaryText.500"
        fontWeight="bold"
        fontSize={{
          sm: "xl",
          md: "2xl",
          lg: "2xl",
        }}
      >
        Sort results by:
      </Text>
      <HStack justifyContent="space-around" mt={2}>
        <TouchableOpacity onPress={() => setSortBy("date")}>
          <Box
            borderWidth={2}
            borderRadius="xl"
            p={2}
            borderColor="coffee.500"
            bg={sortBy == "date" ? "coffee.500" : "background.500"}
          >
            <Text
              color="primaryText.500"
              fontWeight="bold"
              fontSize={{
                sm: "xl",
                md: "2xl",
                lg: "2xl",
              }}
            >
              Date
            </Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortBy("rel")}>
          <Box
            borderWidth={2}
            borderRadius="xl"
            p={2}
            borderColor="coffee.500"
            bg={sortBy == "rel" ? "coffee.500" : "background.500"}
          >
            <Text
              color="primaryText.500"
              fontWeight="bold"
              fontSize={{
                sm: "xl",
                md: "2xl",
                lg: "2xl",
              }}
            >
              Relevance
            </Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortBy("socialScore")}>
          <Box
            borderWidth={2}
            borderRadius="xl"
            p={2}
            borderColor="coffee.500"
            bg={sortBy == "socialScore" ? "coffee.500" : "background.500"}
          >
            <Text
              color="primaryText.500"
              fontWeight="bold"
              fontSize={{
                sm: "lg",
                md: "xl",
                lg: "xl",
              }}
            >
              Shares
            </Text>
          </Box>
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

export default SortBy;

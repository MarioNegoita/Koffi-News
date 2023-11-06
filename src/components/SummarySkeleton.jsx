import React from "react";
import { Center, VStack, Skeleton, Box } from "native-base";
import { Dimensions } from "react-native";

const SummarySkeleton = () => {
  return (
    <Box
      w="100%"
      h="100%"
      borderColor="accent.500"
      borderBottomWidth="2"
      alignItems="center"
      p={5}
    >
      <Skeleton
        width={Dimensions.get("window").width * 0.9}
        height={((Dimensions.get("window").width * 0.9) / 16) * 9}
        startColor="coffee.500"
        borderRadius="xl"
      />
      <VStack
        w="90%"
        space={4}
        rounded="md"
        overflow="hidden"
        maxH="100%"
        my={5}
      >
        <Skeleton.Text startColor="accent.500" lines={2} />

        <Skeleton.Text lines={15} startColor="primaryText.500" my={5} />
      </VStack>
    </Box>
  );
};

export default SummarySkeleton;

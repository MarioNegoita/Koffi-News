import React from "react";
import { Center, VStack, Skeleton } from "native-base";
import { Dimensions } from "react-native";

const SkeletonCard = () => {
  return (
    <Center
      w="100%"
      h="100%"
      my={2}
      borderColor="accent.500"
      borderBottomWidth="2"
    >
      <VStack w="90%" space={4} rounded="md" overflow="hidden" maxH="100%">
        <Skeleton.Text startColor="primaryText.500" />
        <Skeleton
          width={Dimensions.get("window").width * 0.9}
          height={((Dimensions.get("window").width * 0.9) / 16) * 9}
          startColor="coffee.500"
          borderRadius="lg"
          marginY={5}
        />
        <Skeleton.Text lines={4} startColor="primaryText.500" />
        <Skeleton rounded="xl" startColor="button.500" my={5} />
      </VStack>
    </Center>
  );
};

export default SkeletonCard;

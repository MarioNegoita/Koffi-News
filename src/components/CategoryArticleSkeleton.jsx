import React from "react";
import { Box, Skeleton, VStack } from "native-base";
import { Dimensions } from "react-native";

const LoadingSkeleton = () => {
  return (
    <Box borderColor="accent.500" borderBottomWidth="2" p={2}>
      <Box flexDir="row" alignItems="center" justifyContent="space-between">
        <Skeleton.Text lines={4} startColor="primaryText.500" w="50%" />
        <Skeleton
          width={Dimensions.get("window").width * 0.4}
          height={((Dimensions.get("window").width * 0.4) / 16) * 9}
          startColor="coffee.500"
          borderRadius="xl"
        />
      </Box>
      <Skeleton.Text lines={1} width="50%" mt={2} startColor="coffee.500" />
    </Box>
  );
};

const CategoryArticleSkeleton = () => {
  return (
    <VStack width="90%" overflow="hidden">
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </VStack>
  );
};

export default CategoryArticleSkeleton;

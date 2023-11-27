import { View, Text } from "react-native";
import React from "react";
import { Box, Center, Heading } from "native-base";
import HeaderBarNotAnimated from "../components/HeaderBarNotAnimated";
import CategoryCard from "../components/CategoryCard";

const SectionsPage = () => {
  const categories = ["Fashion", "Tech", "Video Games", "Sport"];

  return (
    <Box bg="background.500" flex={1} safeArea>
      <HeaderBarNotAnimated />

      <Box flex={1}>
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </Box>
    </Box>
  );
};

export default SectionsPage;

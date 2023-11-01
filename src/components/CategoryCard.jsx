import { View, Text } from "react-native";
import React from "react";
import { Box, Heading, Center, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CategoryCard = ({ category }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ alignItems: "center" }}
      onPress={() => navigation.push("Category", { category })}
    >
      <Box
        borderBottomWidth={2}
        borderBottomColor="accent.500"
        p={2}
        width="90%"
        mt={5}
      >
        <Heading
          fontSize={{
            sm: "xl",
            md: "xl",
            lg: "xl",
          }}
          color="primaryText.500"
          textAlign="left"
        >
          {category}
        </Heading>
        <Icon
          color="accent.500"
          as={<Ionicons name="chevron-forward" />}
          size="4xl"
          position="absolute"
          right={0}
        />
      </Box>
    </TouchableOpacity>
  );
};

export default CategoryCard;

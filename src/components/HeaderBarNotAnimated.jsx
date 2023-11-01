import React from "react";
import { Box, Heading, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HeaderBarNotAnimated = () => {
  const navigation = useNavigation();
  return (
    <Box
      bgColor="coffee.500"
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      height="70"
    >
      <Box alignItems="center">
        <Heading color="background.500">K O F F I</Heading>
      </Box>
      <Box position="absolute" left={0} marginLeft={5}>
        <TouchableOpacity onPress={() => navigation.push("Profile")}>
          <Icon
            color="background.500"
            as={<Ionicons name="person-circle" />}
            size="4xl"
          />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default HeaderBarNotAnimated;

import React from "react";
import { Box, Heading, Icon } from "native-base";
import { Animated, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Easing } from "react-native";
import { memo } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header_Max_Height = 70;
const Header_Min_Height = 0;

const HeaderBar = ({ animHeaderValue }) => {
  const navigation = useNavigation();
  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height * 2],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{
        height: animateHeaderHeight,
        // Adjust the color as needed
      }}
    >
      <Box
        bgColor="coffee.500"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        height="100%"
      >
        <Box alignItems="center">
          <Heading color="background.500">K O F I</Heading>
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
    </Animated.View>
  );
};

export default memo(HeaderBar);

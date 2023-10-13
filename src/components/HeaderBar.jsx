import React from "react";
import { Box, Heading, Icon, Row } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HeaderBar = () => {
  return (
    <SafeAreaView>
      <Box
        bg="black"
        justifyContent="center"
        alignItems="center"
        p={3}
        flexDirection="row"
      >
        <Box alignItems="center">
          <Heading color="white">K O F I</Heading>
        </Box>
        <TouchableOpacity
          style={{ position: "absolute", left: 0, marginLeft: "5%" }}
        >
          <Icon
            color="white"
            as={<Ionicons name="person-circle" />}
            size="2xl"
          />
        </TouchableOpacity>
      </Box>
    </SafeAreaView>
  );
};

export default HeaderBar;

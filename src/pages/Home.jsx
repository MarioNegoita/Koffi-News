import { Box, Button, Text } from "native-base";
import React from "react";
import { getNews } from "../components/news";
import { logout } from "../../firebase/firebase-fuctions";

const HomePage = () => {
  return (
    <Box width="100%" height="100%" justifyContent="center" alignItems="center">
      <Button onPress={() => logout()}>
        <Text>Press</Text>
      </Button>
    </Box>
  );
};

export default HomePage;

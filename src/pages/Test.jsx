import React, { useEffect } from "react";
import { Box } from "native-base";
import * as secureStore from "expo-secure-store";

const Test = () => {
  useEffect(() => {
    const getIdToken = async () => {
      try {
        const token = await secureStore.getItemAsync("jwt");
        console.log(token);
      } catch (err) {
        console.log(err);
      }
    };

    getIdToken();
  }, []);

  return <Box>Test</Box>;
};

export default Test;

import React, { useEffect } from "react";
import { Box } from "native-base";
import * as secureStore from "expo-secure-store";
import { auth } from "../../firebase/config";
import axios from "axios";

const Test = () => {
  useEffect(() => {
    const getIdToken = async () => {
      try {
        const token = await auth.currentUser.getIdToken(true);

        const response = await axios.get("http://192.168.0.52:3000", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getIdToken();
  }, []);

  return <Box>Test</Box>;
};

export default Test;

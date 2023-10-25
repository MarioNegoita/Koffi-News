import { NativeBaseProvider } from "native-base";
import { Text } from "native-base";
import theme from "./firebase/theme.js";
import { useEffect, useState } from "react";
import Navigator from "./Routes/index.js";
import { auth, onAuthStateChanged } from "./firebase/config.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, db } from "./firebase/config.js";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const checkForLocalStorage = async (user) => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue) {
        return;
      } else {
        storeData(user);
      }
    } catch (err) {
      console.log("Err: ", err);
    }
  };

  const storeData = async (user) => {
    const applicationSettings = JSON.stringify({ textSizeChat: "md" });
    const docRef = doc(db, `users/${user.uid}`);
    // in this case user is the storage key we
    // need to has this and put the key in a safe place like db maybe
    try {
      const docSnap = await getDoc(docRef);
      const jsonValue = JSON.stringify({
        ...user,
        name: docSnap.data().name,
      });
      await AsyncStorage.setItem("user", jsonValue);
    } catch (err) {
      console.log("Err: ", err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid, metadata } = user;
        const { createdAt, lastLoginAt } = metadata;

        checkForLocalStorage({
          email: email,
          uid: uid,
          createdAt: createdAt,
          lastLoginAt: lastLoginAt,
        });

        setIsLoggedIn("Home");
      } else {
        setIsLoggedIn("SignIn");
      }
    });
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      {isLoggedIn ? <Navigator page={isLoggedIn} /> : <Text>Loading...</Text>}
    </NativeBaseProvider>
  );
}

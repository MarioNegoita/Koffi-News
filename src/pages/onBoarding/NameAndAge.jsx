import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  Icon,
  Image,
  Button,
  Text,
  KeyboardAvoidingView,
} from "native-base";
import { OnboardFlow } from "react-native-onboard";
import { Ionicons } from "@expo/vector-icons";
import * as yup from "yup";
import { auth, db, doc, setDoc, updateDoc } from "../../../firebase/config";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const loginSchema = yup.object({
  userName: yup.string().required("User Name Is Required"),
  age: yup.string().required("Age is Required"),
});

const NameAndAgePage = ({ navigation }) => {
  const [userName, setUserName] = useState();
  const [age, setAge] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    loginSchema
      .isValid({ userName: userName, age: age })
      .then(async (isValid) => {
        if (isValid) {
          const docRef = doc(db, `users/${auth.currentUser.uid}`);
          setIsLoading(true);
          updateDoc(docRef, { name: userName, age: age }).then(() => {
            setIsLoading(false);
            navigation.navigate("PickInterests");
          });
        }
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        bg="background.500"
        safeArea
      >
        <OnboardFlow
          style={{ backgroundColor: "#F4E7DB" }}
          pages={[
            {
              title: "Welcome to Koffi",
              subtitle: "Stay Connected And Entertained",
              imageUri:
                "https://i.pinimg.com/474x/47/b6/cc/47b6cc19d44f1aaeca84efc8a157a55b.jpg",
            },
            {
              title: "What are you intrested in?",
              subtitle: "Press Get started and let us suit YOUR needs",
              imageUri:
                "https://i.pinimg.com/236x/e1/34/c8/e134c8611427702314f061e17f91b8f2.jpg",
            },
          ]}
          type={"fullscreen"}
          primaryColor="black"
        />

        {/* USER NAME */}
        <Box alignItems="center" justifyContent="center" flex={1}>
          <Heading fontWeight="semibold" color="primaryText.500" fontSize="2xl">
            How should we call you?
          </Heading>
          <Input
            marginY={5}
            padding={2}
            borderBottomWidth="2"
            borderColor="primaryText.500"
            width={{ lg: "40%", md: "80%", sm: "80%" }}
            fontSize="2xl"
            _focus={{
              borderColor: "accent.500",
              placeholderTextColor: "primaryText.500",
            }}
            textAlign="center"
            variant="underlined"
            placeholder="Name"
            value={userName}
            onChangeText={(value) => {
              setUserName(value);
            }}
          />

          <Heading
            fontWeight="semibold"
            color="primaryText.500"
            fontSize="2xl"
            mt={20}
          >
            How old are you ?
          </Heading>
          <Input
            marginY={5}
            padding={2}
            width="100"
            textAlign="center"
            borderBottomWidth="2"
            borderColor="primaryText.500"
            fontSize="2xl"
            _focus={{
              borderColor: "accent.500",
              placeholderTextColor: "primaryText.500",
            }}
            variant="underlined"
            keyboardType="numeric"
            placeholder="Age"
            value={age}
            onChangeText={(value) => {
              setAge(value);
            }}
          />
        </Box>
        {/* Age and nationality */}

        <Box width="100%" alignItems="center" justifyContent="center">
          <Button
            title="Sign Up"
            rounded="full"
            bg="coffee.500"
            width="90%"
            margin="5%"
            _pressed={{ bg: "accent.500" }}
            padding={3}
            disabled={isLoading}
            isLoading={isLoading}
            onPress={handleConfirm}
          >
            <Text fontWeight="semibold" color="background.500" fontSize="xl">
              Confirm
            </Text>
          </Button>
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default NameAndAgePage;

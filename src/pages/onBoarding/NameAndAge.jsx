import React, { useState } from "react";
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
    <Box flex={1} justifyContent="center" alignItems="center" safeArea>
      <OnboardFlow
        pages={[
          {
            title: "Welcome to Koffi",
            subtitle: "Staying Connected And Entertained",
            imageUri:
              "https://i.pinimg.com/564x/d9/c9/18/d9c9186e6e500f8c158e232d4fb6a3b2.jpg",
          },
          {
            title: "What are you intrested in?",
            subtitle: "Press Get started and let us suit YOUR needs",
            imageUri:
              "https://i.pinimg.com/236x/e1/34/c8/e134c8611427702314f061e17f91b8f2.jpg",
          },
        ]}
        type={"fullscreen"}
      />

      {/* USER NAME */}
      <Box width="80%" alignItems="center" justifyContent="center" flex={1}>
        <Heading fontWeight="semibold" color="black" fontSize="2xl">
          How should we call you?
        </Heading>
        <Input
          textAlign="center"
          marginY={2}
          padding={2}
          borderBottomWidth="2"
          borderColor={"black"}
          style={{ color: "black" }}
          fontSize="2xl"
          _focus={{
            borderColor: "primary3.500",
            placeholderTextColor: "primary4.500",
          }}
          InputRightElement={
            <Icon as={<Ionicons name="pencil" />} size={6} mr="2" />
          }
          variant="underlined"
          placeholder="John Doe"
          placeholderTextColor={"black"}
          color={"white"}
          value={userName}
          onChangeText={(value) => {
            setUserName(value);
          }}
        />
      </Box>
      {/* Age and nationality */}
      <Box width="80%" alignItems="center" justifyContent="center" flex={1}>
        <Heading fontWeight="semibold" color="black" fontSize="2xl">
          How old are you ?
        </Heading>
        <Input
          width="1/3"
          textAlign="center"
          marginY={2}
          padding={2}
          borderBottomWidth="2"
          borderColor={"black"}
          style={{ color: "black" }}
          fontSize="2xl"
          // placeholder="18"
          _focus={{
            borderColor: "primary3.500",
            placeholderTextColor: "primary4.500",
          }}
          variant="underlined"
          keyboardType="numeric"
          placeholderTextColor={"black"}
          color={"white"}
          value={age}
          onChangeText={(value) => {
            setAge(value);
          }}
        />
      </Box>

      <Box width="100%" alignItems="center" justifyContent="center">
        <Button
          title="Sign Up"
          rounded="full"
          bg="primary3.500"
          width="90%"
          margin="5%"
          _pressed={{ bg: "primary2.500" }}
          padding={3}
          disabled={isLoading}
          isLoading={isLoading}
          onPress={handleConfirm}
        >
          <Text fontWeight="semibold" color="white" fontSize="xl">
            Confirm
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export default NameAndAgePage;

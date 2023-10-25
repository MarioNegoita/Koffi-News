import React, { useState } from "react";

import * as yup from "yup";

import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from "native-base";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { signIn } from "../../../firebase/firebase-fuctions";
import { auth } from "../../../firebase/config";

const loginSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 charachters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
});

export const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [passWordHidden, setPasswordHidden] = useState(true);

  const toast = useToast();
  const id = "error-toasts";

  const [isLoading, setIsLoading] = useState(false);

  const resetFieldsErrors = () => {
    setIsInvalidEmail(true);
    setIsInvalidPassword(true);

    setTimeout(() => {
      setIsInvalidEmail(false);
      setIsInvalidPassword(false);
    }, 2500);
  };

  const onSubmit = () => {
    loginSchema
      .isValid({
        email: email,
        password: password,
      })
      .then(async (isValid) => {
        if (isValid) {
          setIsLoading(true);

          await signIn(email, password).then((value) => {
            if (value === 200) {
              navigation.navigate("BottomTabs");
              return;
            } else if (value === 500) {
              if (!toast.isActive(id)) {
                toast.show({
                  id,
                  duration: 2500,
                  placement: "top",
                  render: () => {
                    return (
                      <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                        Your email or password is incorect
                      </Box>
                    );
                  },
                });
              }

              resetFieldsErrors();
              setIsLoading(false);
            }
          });
        }
      });

    loginSchema.validate({ email: email, password: password }).catch((err) => {
      if (!toast.isActive(id)) {
        toast.show({
          id,
          duration: 2500,
          placement: "top",
          render: () => {
            return (
              <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                {err.message}
              </Box>
            );
          },
        });
      }

      if (err.path === "email") {
        setIsInvalidEmail(true);
      } else {
        setIsInvalidPassword(true);
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Center bg="background.500" flex={1} safeArea>
        <Box w="80%" safeArea>
          <Heading size="xl" fontWeight="600" color="primaryText.500">
            Welcome Back!
          </Heading>

          <Heading mt="1" size="md" fontWeight="semibold" color="coffee.500">
            Sign in to continue!
          </Heading>

          <VStack space={10} mt="4">
            <Input
              padding={2}
              borderBottomWidth="2"
              borderColor={`${isInvalidEmail ? "red.500" : "black"}`}
              style={{ fontSize: 20 }}
              _focus={
                isInvalidEmail
                  ? {
                      borderColor: "red.500",
                      placeholderTextColor: "red.500",
                    }
                  : {
                      borderColor: "accent.500",
                      placeholderTextColor: "accent.500",
                    }
              }
              InputRightElement={
                <Icon
                  as={<Ionicons name="mail" />}
                  size={6}
                  mr="2"
                  color={isInvalidEmail ? `red.500` : "primaryText.500"}
                />
              }
              variant="underlined"
              placeholder="Email"
              placeholderTextColor={
                isInvalidEmail ? `red.500` : "primaryText.500"
              }
              color={isInvalidEmail ? "red.500" : "black"}
              value={email}
              onChangeText={(value) => {
                setIsInvalidEmail(false);
                setEmail(value);
              }}
            />

            <Input
              padding={2}
              borderBottomWidth="2"
              borderColor={`${isInvalidPassword ? "red.500" : "black"}`}
              style={{ fontSize: 20 }}
              _focus={
                isInvalidPassword
                  ? {
                      borderColor: "red.500",
                      placeholderTextColor: "red.500",
                    }
                  : {
                      borderColor: "accent.500",
                      placeholderTextColor: "accent.500",
                    }
              }
              type={passWordHidden ? "password" : "text"}
              InputRightElement={
                <Icon
                  as={<Ionicons name={passWordHidden ? "eye-off" : "eye"} />}
                  size={6}
                  mr="2"
                  color={isInvalidPassword ? `red.500` : "primaryText.500"}
                  onPress={() => setPasswordHidden(!passWordHidden)}
                />
              }
              variant="underlined"
              placeholder="Password"
              placeholderTextColor={isInvalidPassword ? `red.500` : "black"}
              color={isInvalidPassword ? "red.500" : "primaryText.500"}
              value={password}
              onChangeText={(value) => {
                setIsInvalidPassword(false);
                setPassword(value);
              }}
            />

            <Link
              _text={{
                fontSize: "sm",
                fontWeight: "500",
                color: "coffee.500",
              }}
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
              alignSelf="flex-end"
            >
              Forgot Password?
            </Link>

            <Button
              title="Sign In"
              rounded="full"
              medium
              backgroundColor="button.500"
              _pressed={{ bg: "accent.500" }}
              onPress={onSubmit}
              disabled={isLoading}
              isLoading={isLoading}
              //the size didnt match so i had to do this..
              _spinner={{ paddingY: "0.45" }}
            >
              <Text fontWeight="semibold" color="coffee.500" fontSize="lg">
                Sign in
              </Text>
            </Button>

            <HStack mt="1" justifyContent="center" alignItems="center">
              <Text fontSize="md" color="primaryText.500">
                Don't have an account ? &nbsp;
              </Text>

              <Link
                _text={{
                  color: "coffee.500",
                  fontWeight: "medium",
                  fontSize: "lg",
                }}
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </TouchableWithoutFeedback>
  );
};

export default LoginPage;

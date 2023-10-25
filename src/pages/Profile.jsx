import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Text,
  Icon,
  Heading,
  VStack,
  Checkbox,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {
  auth,
  db,
  collection,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
} from "../../firebase/config";
import { logout } from "../../firebase/firebase-fuctions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (value) => {
    // Ma asigur ca folosesc cea mai recenta si corecta stare
    setSelectedValues((prevSelectedValues) => {
      if (prevSelectedValues.includes(value)) {
        return prevSelectedValues.filter((v) => v !== value);
      } else {
        // If it's not selected, add it
        return [...prevSelectedValues, value];
      }
    });
  };

  const handleConfirm = async () => {
    if (selectedValues.length) {
      setIsLoading(true);
      try {
        // Check if the user is authenticated
        const user = auth.currentUser;
        if (!user) {
          console.error("User is not authenticated.");
          return false; // Indicate failure
        }

        // Get a reference to the user's document
        const userRef = doc(db, "users", user.uid); // Assuming "users" is your Firestore collection

        // Get a reference to the "interests" subcollection
        const categoriesRef = collection(userRef, "interests");

        //Delete existing interests
        const existingCategories = await getDocs(categoriesRef);
        existingCategories.forEach((doc) => {
          deleteDoc(doc.ref);
        });

        for (const category of selectedValues) {
          const newCategoryRef = doc(categoriesRef, category);

          // Ensure the data is in the correct format
          const categoryData = {
            categoryName: category, // Store additional category data if needed
          };

          await setDoc(newCategoryRef, categoryData);
        }

        console.log("Selected categories added successfully.");
        await AsyncStorage.removeItem("articles");
        setIsLoading(false);
        // navigation.navigate("BottomTabs");
        return true; // Indicate success
      } catch (error) {
        console.error("Error adding selected categories:", error);
        setIsLoading(false);
        throw error;
      }
    } else {
      console.log("Empty array of selected categories.");
      setIsLoading(false);
      return false; // Indicate failure
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("articles");
    await logout();
    navigation.navigate("SignIn");
  };

  return (
    <Box flex={1} backgroundColor="background.500" alignItems="center">
      <Center
        bg="coffee.500"
        width="95%"
        borderRadius="xl"
        mt="5%"
        height={200}
      >
        <Icon color="white" as={<Ionicons name="person-circle" />} size="5xl" />
        <Heading color="white" fontSize="2xl" mt="5">
          Hi Mario
        </Heading>
      </Center>

      <Center mt="25%">
        <Heading> Edit Interests</Heading>
        <VStack space={2} alignItems="flex-start">
          <Box>
            <Text>Selected: ({selectedValues.length})</Text>
          </Box>
          <Checkbox
            size="lg"
            colorScheme="orange"
            value="Politics"
            checked={selectedValues.includes("Fashion")}
            onPress={() => handleCheckboxChange("Fashion")}
          >
            <Text fontSize="xl" fontWeight="semibold">
              Fashion
            </Text>
          </Checkbox>
          <Checkbox
            size="lg"
            colorScheme="orange"
            value="Crime"
            checked={selectedValues.includes("Video Games")}
            onPress={() => handleCheckboxChange("Video Games")}
          >
            <Text fontSize="xl" fontWeight="semibold">
              Video Games
            </Text>
          </Checkbox>
          {/* <Checkbox
            size="lg"
            colorScheme="orange"
            value="Sport"
            checked={selectedValues.includes("Sport")}
            onPress={() => handleCheckboxChange("Sport")}
          >
            <Text fontSize="xl" fontWeight="semibold">
              Sport
            </Text>
          </Checkbox> */}
          <Checkbox
            size="lg"
            colorScheme="orange"
            value="Tech"
            checked={selectedValues.includes("Tech")}
            onPress={() => handleCheckboxChange("Tech")}
          >
            <Text fontSize="xl" fontWeight="semibold">
              Tech
            </Text>
          </Checkbox>
        </VStack>
        <Button
          title="Confirm"
          rounded="full"
          bg="button.500"
          _pressed={{ bg: "accent.500" }}
          mt={10}
          px={10}
          py={2}
          onPress={handleConfirm}
          disabled={isLoading}
          isLoading={isLoading}
        >
          <Text
            fontWeight="semibold"
            color="coffee.500"
            fontSize="lg"
            textAlign="center"
          >
            Confirm
          </Text>
        </Button>
        <Button
          title="Confirm"
          rounded="full"
          bg="button.500"
          _pressed={{ bg: "accent.500" }}
          mt={10}
          px={10}
          py={2}
          onPress={() => handleLogout()}
          disabled={isLoading}
          isLoading={isLoading}
        >
          <Text
            fontWeight="semibold"
            color="accent.500"
            fontSize="lg"
            textAlign="center"
          >
            Log Out
          </Text>
        </Button>
      </Center>
    </Box>
  );
};

export default Profile;
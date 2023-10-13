import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Checkbox,
  Button,
  Image,
} from "native-base";
import { useState } from "react";
import {
  auth,
  db,
  doc,
  setDoc,
  updateDoc,
  collection,
  getDoc,
  deleteDoc,
} from "../../../firebase/config";

const PickInterestsPage = ({ navigation }) => {
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

        // For deleting exisitng data:
        // try {
        //   const querySnapshot = await getDocs(
        //     collection(db, `games/${roomData.keyCode}/chat`),
        //   );

        //   querySnapshot.forEach((doc) => {
        //     messageIDs.push(doc.id); // luam id ul fiecarui mesaj din colectia chat
        //   }); // corespunzatoare camerei de joc
        // } catch (err) {
        //   console.log('Error: ', err);
        // }

        // for (let i = 0; i < messageIDs.length; i++) {
        //   deleteDoc(doc(db, `games/${roomData.keyCode}/chat/${messageIDs[i]}`)); // il stergem
        // }

        // Add selected categories to the subcollection
        for (const category of selectedValues) {
          const newCategoryRef = doc(categoriesRef, category);

          // Ensure the data is in the correct format
          const categoryData = {
            categoryName: category, // Store additional category data if needed
          };

          await setDoc(newCategoryRef, categoryData);
        }

        console.log("Selected categories added successfully.");
        setIsLoading(false);
        navigation.navigate("BottomTabs");
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

  return (
    <Box flex={1} justifyContent="space-between" alignItems="center" safeArea>
      <Box flex={1}>
        <Box
          flex={1}
          alignItems="center"
          justifyContent={"center"}
          marginTop={5}
        >
          <Box justifyContent="center" alignItems="center">
            <Image
              source={{
                uri: "https://i.pinimg.com/474x/6c/4f/a3/6c4fa3afa1295faa6820dfa0c04d262e.jpg",
              }}
              alt="image"
              size="2xl"
            />
          </Box>
          <Heading
            fontWeight="semibold"
            color="black"
            fontSize="2xl"
            textAlign="center"
            marginBottom={4}
          >
            Pick what kind of news you wish to see
          </Heading>
          <Heading
            fontWeight="semibold"
            color="black"
            fontSize="xl"
            textAlign="center"
            marginBottom={4}
          >
            We made a list of the most common news categories.
          </Heading>
        </Box>
        <Box flex={1} alignItems="center" justifyContent={"center"}>
          <VStack space={2} alignItems="flex-start">
            <Box>
              <Text>Selected: ({selectedValues.length})</Text>
            </Box>
            <Checkbox
              size="lg"
              colorScheme="orange"
              value="Politics"
              checked={selectedValues.includes("Politics")}
              onPress={() => handleCheckboxChange("Politics")}
            >
              <Text fontSize="xl" fontWeight="semibold">
                Politics
              </Text>
            </Checkbox>
            <Checkbox
              size="lg"
              colorScheme="orange"
              value="Crime"
              checked={selectedValues.includes("Crime")}
              onPress={() => handleCheckboxChange("Crime")}
            >
              <Text fontSize="xl" fontWeight="semibold">
                Crime
              </Text>
            </Checkbox>
            <Checkbox
              size="lg"
              colorScheme="orange"
              value="Sport"
              checked={selectedValues.includes("Sport")}
              onPress={() => handleCheckboxChange("Sport")}
            >
              <Text fontSize="xl" fontWeight="semibold">
                Sport
              </Text>
            </Checkbox>
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
        </Box>
      </Box>
      <Button
        title="Confirm"
        rounded="full"
        bg="primary3.500"
        width="90%"
        marginBottom="5%"
        _pressed={{ bg: "primary2.500" }}
        padding={3}
        onPress={handleConfirm}
        disabled={isLoading}
        isLoading={isLoading}
      >
        <Text fontWeight="semibold" color="white" fontSize="xl">
          Confirm
        </Text>
      </Button>
    </Box>
  );
};

export default PickInterestsPage;

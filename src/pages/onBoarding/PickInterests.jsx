import {
  Box,
  Text,
  VStack,
  Heading,
  Checkbox,
  Button,
  Image,
} from "native-base";
import { useState } from "react";
import { auth, db, doc, setDoc, collection } from "../../../firebase/config";

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
    <Box flex={1} alignItems="center" safeArea bgColor="background.500">
      <Box flex={1}>
        <Box alignItems="center" justifyContent="center" mt={5}>
          <Box justifyContent="center" alignItems="center">
            <Image
              source={{
                uri: "https://i.pinimg.com/236x/25/2c/3d/252c3d6d4cc6cad5eda774fc3afe04ea.jpg",
              }}
              alt="image"
              size="2xl"
            />
          </Box>
          <Heading
            fontWeight="bold"
            color="primaryText.500"
            fontSize="2xl"
            textAlign="center"
            mt={5}
          >
            Pick what kind of news you wish to see
          </Heading>
        </Box>
        <Box alignItems="center" justifyContent="center" mt={20}>
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
        </Box>
      </Box>
      <Button
        title="Confirm"
        rounded="full"
        bg="button.500"
        width="90%"
        marginBottom="5%"
        _pressed={{ bg: "accent.500" }}
        padding={3}
        onPress={handleConfirm}
        disabled={isLoading}
        isLoading={isLoading}
      >
        <Text fontWeight="semibold" color="background.500" fontSize="xl">
          Confirm
        </Text>
      </Button>
    </Box>
  );
};

export default PickInterestsPage;

import React, { useState, useRef, useEffect } from "react";
import { HStack, Input, Text, Box } from "native-base";

const Sources = ({ sources, setSources }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleEnterPress = () => {
    if (inputValue.trim() !== "") {
      setSources((prevSources) => [
        ...prevSources,
        { source: inputValue.toLowerCase().trim(), operator: "OR" },
      ]);
    }
    setInputValue(""); // Clear the input value after pressing Enter
  };

  const handleBackspace = () => {
    if (inputValue === "" && sources.length > 0) {
      const updatedSources = [...sources];
      updatedSources.pop(); // Remove the last source
      setSources(updatedSources);
    } else if (inputValue === "" && sources.length === 0) {
      // If no sources, you can handle any additional logic here
    }
  };

  useEffect(() => {
    const inputWidth = inputRef.current?.measure((width) => width);
    const containerWidth = 300; // Set the width based on your container's width

    if (inputWidth && inputWidth >= containerWidth) {
      handleEnterPress(); // Automatically move to the next line
    }
  }, [inputValue]);

  const renderSources = () => {
    return sources?.map((item, index) => (
      <HStack key={index} alignItems="center">
        {index !== 0 && ( // Render operator before the source, but not for the first source
          <Box bg="button.500" mr={1} p={1} borderRadius="lg">
            <Text fontSize="lg" fontWeight="bold" color="background.500">
              {item.operator}
            </Text>
          </Box>
        )}
        <Box bg="coffee.500" mr={1} p={1} borderRadius="lg" alignItems="center">
          <Text fontSize="lg" fontWeight="bold" color="background.500">
            {item.source}
          </Text>
        </Box>
      </HStack>
    ));
  };

  return (
    <Box mt={5}>
      <Text
        color="primaryText.500"
        fontWeight="bold"
        fontSize={{
          sm: "xl",
          md: "2xl",
          lg: "2xl",
        }}
      >
        Sources
      </Text>
      <HStack
        px={2}
        borderWidth={2}
        borderRadius="lg"
        borderColor="coffee.500"
        alignItems={"center"}
        flexWrap="wrap"
      >
        {renderSources()}
        <Input
          variant="unstyled"
          fontSize="lg"
          fontWeight="bold"
          value={inputValue}
          onChangeText={handleInputChange}
          onSubmitEditing={handleEnterPress}
          onKeyPress={(e) =>
            e.nativeEvent.key === "Backspace" && handleBackspace()
          }
          flex={1}
          ref={inputRef}
        />
      </HStack>
    </Box>
  );
};

export default Sources;

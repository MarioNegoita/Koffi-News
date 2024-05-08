import React, { useState, useRef, useEffect } from "react";
import { HStack, Input, Text, Box } from "native-base";
import { Pressable, TouchableOpacity } from "react-native";

const KeyWordsInput = ({ keywords, setKeywords, operator, setOperator }) => {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef(null);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleEnterPress = () => {
    if (inputValue.trim() !== "") {
      setKeywords((prevKeywords) => [...prevKeywords, inputValue.trim()]);
    }
    setInputValue(""); // Clear the input value after pressing Enter
  };

  const handleBackspace = () => {
    if (inputValue === "" && keywords.length > 0) {
      const updatedKeywords = [...keywords];
      updatedKeywords.pop(); // Remove the last keyword
      setKeywords(updatedKeywords);
    } else if (inputValue === "" && keywords.length === 0) {
      // If no keywords, you can handle any additional logic here
    }
  };

  useEffect(() => {
    const inputWidth = inputRef.current?.measure((width) => width);
    const containerWidth = 300; // Set the width based on your container's width

    if (inputWidth && inputWidth >= containerWidth) {
      handleEnterPress(); // Automatically move to the next line
    }
  }, [inputValue]);

  const renderKeywords = () => {
    return keywords?.map((keyword, index) => (
      <Box
        key={index}
        bg="coffee.500"
        mr={1}
        p={1}
        borderRadius="lg"
        alignItems="center"
      >
        <Text fontSize="lg" fontWeight="bold" color="background.500">
          {keyword}
        </Text>
      </Box>
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
        Keywords
      </Text>

      <HStack
        px={2}
        borderWidth={2}
        borderRadius="lg"
        borderColor="coffee.500"
        alignItems={"center"}
        flexWrap="wrap"
      >
        {renderKeywords()}
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
      <HStack alignItems="center" mt={2}>
        <Text
          color="primaryText.500"
          fontWeight="bold"
          fontSize={{
            sm: "xl",
            md: "2xl",
            lg: "2xl",
          }}
        >
          Keywords operator:{" "}
        </Text>
        <TouchableOpacity
          onPress={() =>
            operator == "AND" ? setOperator("OR") : setOperator("AND")
          }
        >
          <Box bg="button.500" p={1} borderRadius="lg">
            <Text
              color="background.500"
              fontWeight="bold"
              fontSize={{
                sm: "xl",
                md: "2xl",
                lg: "2xl",
              }}
            >
              {operator}
            </Text>
          </Box>
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

export default KeyWordsInput;

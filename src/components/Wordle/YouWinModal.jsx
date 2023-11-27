import React from "react";
import { Box, Center, Heading, Modal, Text, Button, HStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

const YouWinModal = ({ showModal, word, gameState, resetGame }) => {
  const navigation = useNavigation();
  return (
    <Modal isOpen={showModal}>
      <Modal.Content
        // width="50%"
        // height="40%"
        p={10}
        justifyContent="center"
        alignItems="center"
        bg="background.500"
        borderRadius="xl"
      >
        {gameState == "win" && (
          <Center>
            <Heading
              fontSize={{
                sm: "2xl",
                md: "3xl",
                lg: "3xl",
              }}
              fontWeight="bold"
              color="primaryText.500"
              textAlign="center"
            >
              Good Job!
            </Heading>
            <HStack mt={5}>
              <Text
                fontSize={{
                  sm: "2xl",
                  md: "3xl",
                  lg: "3xl",
                }}
                fontWeight="600"
                color="primaryText.500"
                textAlign="left"
              >
                Correct word:{" "}
              </Text>
              <Text
                fontSize={{
                  sm: "2xl",
                  md: "3xl",
                  lg: "3xl",
                }}
                fontWeight="600"
                color="success.500"
                textAlign="left"
              >
                {word}
              </Text>
            </HStack>

            <Button
              backgroundColor="button.500"
              rounded="xl"
              _pressed={{
                opacity: 0.5, // Opacity when pressed
              }}
              onPress={() => {
                navigation.goBack();
              }}
              mt={5}
            >
              <Text color="coffee.500" fontSize="md" fontWeight="semibold">
                Back to reading news
              </Text>
            </Button>
          </Center>
        )}
        {gameState == "lost" && (
          <Center>
            <Heading
              fontSize={{
                sm: "2xl",
                md: "3xl",
                lg: "3xl",
              }}
              fontWeight="bold"
              color="accent.500"
              textAlign="center"
            >
              You lost!
            </Heading>

            <Button
              backgroundColor="button.500"
              rounded="xl"
              _pressed={{
                opacity: 0.5, // Opacity when pressed
              }}
              onPress={() => {
                resetGame();
              }}
              mt={5}
            >
              <Text color="coffee.500" fontSize="md" fontWeight="semibold">
                Try again
              </Text>
            </Button>

            <Button
              backgroundColor="button.500"
              rounded="xl"
              _pressed={{
                opacity: 0.5, // Opacity when pressed
              }}
              onPress={() => {
                navigation.goBack();
              }}
              mt={5}
            >
              <Text color="coffee.500" fontSize="md" fontWeight="semibold">
                Back to reading news
              </Text>
            </Button>
          </Center>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default YouWinModal;

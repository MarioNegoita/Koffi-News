import React from "react";
import {
  Box,
  Modal,
  Spinner,
  Heading,
  Center,
  Button,
  Text,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

const LoadingModal = ({ showModal, loadedSearch, results, setShowModal }) => {
  const navigation = useNavigation();
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.CloseButton />
      <Modal.Content>
        <Box p={5} bg="background.500">
          {!loadedSearch && (
            <Center>
              <Heading
                fontSize={{
                  sm: "2xl",
                  md: "3xl",
                  lg: "3xl",
                }}
                fontWeight="bold"
                color="primaryText.500"
                textAlign="left"
              >
                Retrieving articles
              </Heading>
              <Spinner color="coffee.500" size="xl" mt={5} />
            </Center>
          )}
          {loadedSearch && (
            <Center>
              <Heading
                fontSize={{
                  sm: "2xl",
                  md: "3xl",
                  lg: "3xl",
                }}
                fontWeight="bold"
                color="primaryText.500"
                textAlign="left"
              >
                Articles Found: {results.articles.count}
              </Heading>
              <Button
                title="Search"
                mt={5}
                mb={5}
                rounded="full"
                bg="button.500"
                _pressed={{ bg: "coffee.500" }}
                onPress={() => {
                  setShowModal(false);
                  navigation.push("SearchedArticles", { articles: results });
                }}
              >
                <Text
                  fontWeight="semibold"
                  color="background.500"
                  fontSize="lg"
                  textAlign="center"
                >
                  Go to articles
                </Text>
              </Button>
            </Center>
          )}
        </Box>
      </Modal.Content>
    </Modal>
  );
};

export default LoadingModal;

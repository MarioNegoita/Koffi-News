import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import {
  Box,
  Button,
  Heading,
  ScrollView,
  Text,
  Image,
  Center,
  Icon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ArticlePage = ({ route }) => {
  const { articleBody, title, imageURL } = route.params;
  const navigation = useNavigation();

  return (
    <Box bg="background.500" flex={1}>
      <Box height={70} bg="coffee.500" alignItems="center" flexDir="row">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            color="button.500"
            as={<Ionicons name="chevron-back" />}
            size="2xl"
            ml={2}
          />
        </TouchableOpacity>
        <Heading color="background.500" ml={2}>
          Category
        </Heading>
      </Box>
      <ScrollView>
        <Box p={2} pt={5} borderBottomWidth={2} borderColor="accent.500">
          <Heading fontWeight="bold" color="primaryText.500" textAlign="left">
            {title}
          </Heading>
        </Box>
        <Center>
          {imageURL != "image" ? (
            <Image
              source={{
                uri: imageURL,
              }}
              alt="image"
              width={Dimensions.get("window").width * 0.9}
              height={((Dimensions.get("window").width * 0.9) / 16) * 9}
              marginY="5"
              borderRadius="xl"
            />
          ) : (
            "image"
          )}
        </Center>

        <Box p={2}>
          <Heading
            fontSize={{
              sm: "xl",
              md: "xl",
              lg: "2xl",
            }}
            fontWeight="normal"
            color="primaryText.500"
            textAlign="left"
          >
            {articleBody}
          </Heading>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default ArticlePage;

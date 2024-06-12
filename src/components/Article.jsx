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
import AsyncStorage from "@react-native-async-storage/async-storage";

const ArticlePage = ({ route }) => {
  const { articleBody, title, imageURL, index, comesFrom } = route.params;
  const navigation = useNavigation();

  const handleDeleteFromBookmarks = async () => {
    const articles = await AsyncStorage.getItem("bookmarks");
    const parsedArticles = await JSON.parse(articles);
    parsedArticles.splice(index, 1);
    await AsyncStorage.setItem("bookmarks", JSON.stringify(parsedArticles));
    navigation.goBack();
  };

  return (
    <Box bg="background.500" flex={1} safeArea>
      <Box
        height={70}
        bg="coffee.500"
        alignItems="center"
        justifyContent="space-between"
        flexDir="row"
      >
        <Box flexDir="row">
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
        {comesFrom == "bookmarks" && (
          <TouchableOpacity onPress={handleDeleteFromBookmarks}>
            <Icon
              color="button.500"
              as={<Ionicons name="trash-bin" />}
              size="2xl"
              mr={2}
            />
          </TouchableOpacity>
        )}
      </Box>

      <ScrollView>
        <Box p={2} pt={5}>
          <Heading fontWeight="bold" color="primaryText.500" textAlign="left">
            {title}
          </Heading>
        </Box>
        <Center bg="button.500">
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
            <Image
              source={{
                uri: "https://i.pinimg.com/236x/e2/18/eb/e218ebeb0706ebd4e7c056c7f28c0954.jpg",
              }}
              alt="image"
              width={Dimensions.get("window").width * 0.9}
              height={((Dimensions.get("window").width * 0.9) / 16) * 9}
              marginY="5"
              borderRadius="xl"
            />
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

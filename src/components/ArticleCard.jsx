import { Dimensions, TouchableOpacity } from "react-native";
import {
  Image,
  Box,
  Heading,
  Text,
  Center,
  Button,
  HStack,
  Icon,
} from "native-base";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ArticleCard = ({ articleBody, title, imageURL }) => {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const articlePreview = articleBody?.slice(0, 200);

  const handleFullArticle = () => {
    navigation.push("Article", {
      articleBody: articleBody,
      title: title,
      imageURL: imageURL,
    });
  };

  return (
    <Box
      width="95%"
      borderColor="accent.500"
      borderBottomWidth="2"
      p={2}
      mb="5"
      // ref={(ref) => {
      //   articleRefs[index] = ref;
      // }}
    >
      <Heading
        fontSize={{
          sm: "xl",
          md: "2xl",
          lg: "2xl",
        }}
        fontWeight="600"
        color="primaryText.500"
        textAlign="left"
        mt={5}
      >
        {title}
      </Heading>

      {imageURL === "image" ? (
        <Image
          source={{
            uri: "https://i.pinimg.com/236x/e2/18/eb/e218ebeb0706ebd4e7c056c7f28c0954.jpg",
          }}
          alt="image"
          width={Dimensions.get("window").width * 0.9}
          height={((Dimensions.get("window").width * 0.9) / 16) * 9}
          borderRadius="xl"
        />
      ) : imageURL ? (
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
      ) : null}

      <Text
        fontSize={{
          sm: "md",
          md: "xl",
          lg: "xl",
        }}
        fontWeight="600"
        color="primaryText.500"
        textAlign="left"
      >
        {articlePreview}...
      </Text>
      <Button
        backgroundColor="button.500"
        rounded="xl"
        _pressed={{
          opacity: 0.5, // Opacity when pressed
        }}
        onPress={() => handleFullArticle()}
        my={5}
      >
        <Text color="coffee.500" fontSize="md" fontWeight="semibold">
          Read More
        </Text>
      </Button>
      <Box
        w="100%"
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text color="coffee.500">Liked by 100 others</Text>
        <Box flexDir="row">
          <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
            <Icon
              color="accent.500"
              as={<Ionicons name={isLiked ? "heart" : "heart-outline"} />}
              size="3xl"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
            <Icon
              color="yellow.500"
              as={
                <Ionicons
                  name={isBookmarked ? "bookmark" : "bookmark-outline"}
                />
              }
              size="3xl"
            />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleCard;

import { Dimensions } from "react-native";
import { Image, Box, Heading, Text, Center, Button } from "native-base";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ArticleCard = ({ articleBody, title, imageURL, comesFrom }) => {
  const navigation = useNavigation();

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
        "image"
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
    </Box>
  );
};

export default ArticleCard;

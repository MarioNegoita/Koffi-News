import { Dimensions, TouchableOpacity } from "react-native";
import { Image, Box, Heading, Text, Center, Button } from "native-base";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const CategoryArticleCard = ({ articleBody, title, imageURL, comesFrom }) => {
  const navigation = useNavigation();
  const date = new Date().toDateString();

  const handleFullArticle = () => {
    navigation.push("Article", {
      articleBody: articleBody,
      title: title,
      imageURL: imageURL,
    });
  };

  return (
    <Box width="95%" borderColor="accent.500" borderBottomWidth="2" p={2}>
      <TouchableOpacity
        onPress={() => {
          handleFullArticle();
        }}
      >
        <Box flexDir="row" alignItems="center" justifyContent="center">
          {/* Use flexDir and alignItems */}
          <Box flex={1}>
            <Heading
              fontSize={{
                sm: "xl",
                md: "2xl",
                lg: "2xl",
              }}
              color="primaryText.500"
              textAlign="left"
            >
              {title}
            </Heading>
          </Box>
          {imageURL === "image" ? (
            "image"
          ) : imageURL ? (
            <Image
              source={{
                uri: imageURL,
              }}
              alt="image"
              width={Dimensions.get("window").width * 0.4}
              height={((Dimensions.get("window").width * 0.5) / 16) * 9}
              borderRadius="xl"
            />
          ) : null}
        </Box>

        <Text color="coffee.500">{date}</Text>
      </TouchableOpacity>
    </Box>
  );
};

export default CategoryArticleCard;

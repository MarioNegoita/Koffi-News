import { Box, Center, Text, Heading, Image } from "native-base";
import React from "react";
import { Dimensions } from "react-native";

const SummaryCard = ({ articleBody, title, imageURL }) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height - 60; //60 is the height of the bottom tab navigator
  return (
    <Box borderColor="accent.500" width={width} height={height}>
      <Box>
        {imageURL === "image" ? (
          <Image
            source={{
              uri: "https://i.pinimg.com/236x/e2/18/eb/e218ebeb0706ebd4e7c056c7f28c0954.jpg",
            }}
            alt="image"
            width={Dimensions.get("window").width}
            height={(Dimensions.get("window").width / 16) * 9}
          />
        ) : imageURL ? (
          <Image
            source={{
              uri: imageURL,
            }}
            alt="image"
            width={Dimensions.get("window").width}
            height={(Dimensions.get("window").width / 16) * 9}
          />
        ) : null}
        <Box
          zIndex={1}
          borderTopRadius="2xl"
          bg="background.500"
          p={4}
          //   position="relative"
          top={-20}
        >
          <Heading
            fontSize={{
              sm: "md",
              md: "lg",
              lg: "lg",
            }}
            color="accent.500"
            textAlign="center"
            mb={5}
          >
            {title}
          </Heading>
          <Box>
            <Text
              fontSize={{
                sm: "md",
                md: "xl",
                lg: "xl",
              }}
              fontWeight="600"
              color="primaryText.500"
              textAlign="justify"
            >
              {articleBody}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SummaryCard;

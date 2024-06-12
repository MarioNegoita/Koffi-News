import React, { useEffect, useState } from "react";
import { Box, ScrollView, Icon, Heading } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArticleCard from "../components/ArticleCard";
import CategoryArticleCard from "../components/CategoryArticleCard";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BookmarksPage = ({ navigation }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    const articles = await AsyncStorage.getItem("bookmarks");
    if (articles) {
      const parsedArticles = JSON.parse(articles);
      setArticles(parsedArticles);
    }

    return await JSON.parse(articles);
  };

  return (
    <Box flex={1} bg="background.500" safeArea>
      <Box height={70} bg="coffee.500" alignItems="center" flexDir="row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            color="button.500"
            as={<Ionicons name="chevron-back" />}
            size="2xl"
            ml={2}
          />
        </TouchableOpacity>
        <Heading color="background.500" ml={2}>
          Bookmarks
        </Heading>
      </Box>
      <ScrollView>
        {articles.map((article, index) => (
          <CategoryArticleCard
            key={index}
            title={article.articleTitle}
            articleBody={article.articleBody}
            imageURL={article.articleImage}
            // onClick={scrollToArticle}
            // articleRefs={articleRefs}
            index={index}
            comesFrom={"bookmarks"}
          />
        ))}
      </ScrollView>
    </Box>
  );
};

export default BookmarksPage;

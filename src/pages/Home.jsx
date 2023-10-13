import React, { useEffect, useState, useRef } from "react";
import { Box, Text, ScrollView } from "native-base";
import FullArticle from "../components/FullArticle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getNews } from "../components/news";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollViewRef = useRef();
  const articleRefs = [];
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getNews("dmoz/Business/Information_Technology");
        const fetchedData = response.data.articles.results;
        await AsyncStorage.setItem("articles", JSON.stringify(fetchedData));
        setArticles(fetchedData.slice(0, 5));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchArticlesFromStorage() {
      try {
        const storedArticles = await AsyncStorage.getItem("articles");
        if (storedArticles) {
          const parsedArticles = JSON.parse(storedArticles);
          setArticles(parsedArticles.slice(0, 5));
          setIsLoading(false);
        } else {
          fetchData();
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchArticlesFromStorage();

    return () => {
      articleRefs.length = 0;
    };
  }, []);

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const hideThreshold = 100; // Adjust this value as needed

    if (yOffset > hideThreshold) {
      navigation.setOptions({ headerShown: false });
    } else {
      navigation.setOptions({ headerShown: true });
    }
  };

  const scrollToArticle = (index) => {
    if (scrollViewRef.current) {
      const selectedArticleRef = articleRefs[index];
      if (selectedArticleRef) {
        selectedArticleRef.measureLayout(scrollViewRef.current, (x, y) => {
          scrollViewRef.current.scrollTo({ y, animated: false });
        });
      }
    }
  };

  return (
    <Box safeArea>
      <ScrollView ref={scrollViewRef} onScroll={(event) => handleScroll(event)}>
        <Box alignItems="center">
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            articles.map((article, index) => (
              <FullArticle
                key={index}
                title={article.title}
                articleBody={article.body}
                imageURL={article.image}
                onClick={scrollToArticle}
                articleRefs={articleRefs}
                index={index}
              />
            ))
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default HomePage;

import React, { useEffect, useState, useRef } from "react";
import { Box, Text, ScrollView } from "native-base";
import FullArticle from "../components/FullArticle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getNews from "../components/getNews";
import { RefreshControl } from "react-native";
import HeaderBar from "../components/HeaderBar";
import { Animated } from "react-native";

const HomePage = () => {
  const scrollOffsetY = new Animated.Value(0);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const scrollViewRef = useRef();
  const articleRefs = [];

  useEffect(() => {
    fetchArticlesFromStorage();

    //Use only fetchData() for debug purpose. Get news directly from firestore, avoiding async storage
    // fetchData();

    return () => {
      articleRefs.length = 0;
    };
  }, []);

  const fetchArticlesFromStorage = async () => {
    try {
      const storedArticles = await AsyncStorage.getItem("articles");

      if (storedArticles) {
        const parsedArticles = JSON.parse(storedArticles);
        setArticles(parsedArticles);
        setIsLoading(false);
      } else {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const fetchedData = await getNews();

      await AsyncStorage.setItem("articles", JSON.stringify(fetchedData));
      setArticles(fetchedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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

  const onRefresh = async () => {
    // Perform your data fetching or refreshing logic here

    await AsyncStorage.removeItem("articles");

    fetchArticlesFromStorage();
    setRefreshing(true);

    // After fetching or refreshing, set refreshing to false to stop the loading indicator
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <Box safeArea backgroundColor="background.500" flex={1}>
      <HeaderBar animHeaderValue={scrollOffsetY} />
      <ScrollView
        scrollEventThrottle={16}
        ref={scrollViewRef}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollOffsetY,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Box alignItems="center">
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            articles.map((article, index) => (
              <FullArticle
                key={index}
                title={article.articleTitle}
                articleBody={article.articleBody}
                imageURL={article.articleImage}
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

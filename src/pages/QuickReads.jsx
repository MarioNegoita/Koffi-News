import React, { useEffect, useState } from "react";
import { Box, FlatList } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshControl } from "react-native";
import SummaryCard from "../components/SummaryCard";
import SummarySkeleton from "../components/SummarySkeleton";

const QuickReadsPage = () => {
  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    fetchArticlesFromStorage();
  }, []);
  const fetchArticlesFromStorage = async () => {
    setIsLoading(true);
    try {
      const storedArticles = await AsyncStorage.getItem("articles");

      if (storedArticles) {
        const parsedArticles = JSON.parse(storedArticles);
        setArticles(parsedArticles);
      } else {
        console.log("Not stored in async yet LOLOLOL");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const onRefresh = async () => {
    // Perform your data fetching or refreshing logic

    setIsLoading(true);
    setRefreshing(true);
    fetchArticlesFromStorage();

    // After fetching or refreshing, set refreshing to false to stop the loading indicator
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
    }, 1000);
  };

  // Define a function to render each item in the FlatList
  const renderItem = ({ item, index }) => (
    <SummaryCard
      key={index}
      title={item.summaryTitle}
      articleBody={item.summary}
      imageURL={item.articleImage}
      index={index}
    />
  );

  return (
    <Box bg="background.500" flex={1}>
      {isLoading || refreshing ? (
        <SummarySkeleton />
      ) : (
        <FlatList
          flex={1}
          data={articles} // Pass your data array
          renderItem={renderItem} // Render each item using the renderItem function
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </Box>
  );
};

export default QuickReadsPage;

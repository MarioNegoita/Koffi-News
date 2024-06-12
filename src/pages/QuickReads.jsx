import React, { useEffect, useState, useRef } from "react";
import { Box, FlatList } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Dimensions, RefreshControl } from "react-native";
import SummaryCard from "../components/SummaryCard";
import SummarySkeleton from "../components/SummarySkeleton";
import { useScrollToTop } from "@react-navigation/native";
import getNews from "../components/getNews";

const QuickReadsPage = () => {
  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [isListLoading, setIsListLoading] = useState(false);

  const scrollViewRef = useRef(null);
  const onScrollToTop = useScrollToTop(scrollViewRef);

  const limit = 10;
  const pageIdentifier = useRef(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (pageIdentifier.current == 1) setIsLoading(true);
      const fetchedData = await getNews(pageIdentifier.current, limit);

      if (fetchedData) {
        setArticles((prevArticles) => [...prevArticles, ...fetchedData]);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {
    // Perform your data fetching or refreshing logic
    setRefreshing(true);
    setIsLoading(true);
    setArticles([]);
    pageIdentifier.current = 1;
    // await AsyncStorage.removeItem("articles");
    fetchData();

    // After fetching or refreshing, set refreshing to false to stop the loading indicator
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleOnEndReached = async () => {
    pageIdentifier.current++;
    try {
      setIsListLoading(true);
      await fetchData();
      setIsListLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const ListEndLoader = () => {
    if (isListLoading) {
      return <ActivityIndicator size={"medium"} color={"brown"} />;
    }
  };

  // Define a function to render each item in the FlatList
  const renderItem = ({ item, index }) => (
    <SummaryCard
      key={index}
      title={item.title}
      articleBody={item.summary}
      imageURL={item.image}
      index={index}
    />
  );

  return (
    <Box bg="background.500" flex={1} safeArea>
      {isLoading || refreshing ? (
        <SummarySkeleton />
      ) : (
        <FlatList
          ref={scrollViewRef}
          flex={1}
          data={articles} // Pass your data array
          renderItem={renderItem} // Render each item using the renderItem function
          keyExtractor={(item, index) => index.toString()}
          pagingEnabled
          snapToAlignment="center"
          decelerationRate={"fast"}
          snapToInterval={Dimensions.get("window").height - 60}
          onRefresh={onRefresh}
          refreshing={refreshing}
          onEndReachedThreshold={0.8}
          onEndReached={handleOnEndReached}
          ListFooterComponent={ListEndLoader}
          disableIntervalMomentum={true}
        />
      )}
    </Box>
  );
};

export default QuickReadsPage;

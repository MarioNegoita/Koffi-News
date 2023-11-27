import React, { useEffect, useState, useRef, Fragment } from "react";
import { Box, Text, ScrollView } from "native-base";
import FullArticle from "../components/ArticleCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getNews from "../components/getNews";
import { RefreshControl } from "react-native";
import HeaderBar from "../components/HeaderBarAnimated";
import { Animated } from "react-native";
import ArticleCard from "../components/ArticleCard";
import SkeletonCard from "../components/SkeletonCard";
import { useScrollToTop } from "@react-navigation/native";
import WeatherCard from "../components/Weather/WeatherCard";
import TimeCapsuleCard from "../components/TimeCapsule/TimeCapsuleCard";
import FunFactsCard from "../components/FunFacts/FunFactsCard";
import QuoteOfTheDay from "../components/QuoteOfTheDay/QuoteOfTheDay";
import WordleCard from "../components/Wordle/WordleCard";
import axios from "axios";
import * as Location from "expo-location";
import { date } from "yup";

const ForYouPage = () => {
  const scrollOffsetY = new Animated.Value(0);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [weatherData, setWeatherData] = useState();
  const scrollViewRef = useRef(null);
  const onScrollToTop = useScrollToTop(scrollViewRef); // for scrolling up when clicking the navigation button
  const weatherKey = "2faa2d5bdcf593b0a1b5011a32dd2896"; //DONT FORGET TO REMOVE!!!!!!!!!!!!!!!!
  const ninjaKey = "TTFij1m4faQDtG5Rn4/EtQ==zG2qRFT4GgAEkbFe"; //DONT FORGET TO REMOVE!!!!!!!!!!!!!!!!
  const [errorMsg, setErrorMsg] = useState(null);
  const [timeCapsule, setTimeCapsule] = useState("");
  const [funFacts, setFunFacts] = useState([]);
  const [quoteOfTheDay, setQuoteOfTheDay] = useState("");

  //Gets news and weather info
  // Should be called every day
  useEffect(() => {
    fetchArticlesFromStorage();
    getLocation();

    //Use only fetchData() for debug purpose. Get news directly from firestore, avoiding async storage
    // fetchData();
  }, []);

  // Gets data that should only be fetched once per day per user. So we should delete asyncStorage keys daily
  useEffect(() => {
    getTodaysTimeCapsule();
    getFunFacts();
    getQuoteOfTheDay();
    getWordleWord();
  }, []);

  const getQuoteOfTheDay = async () => {
    const response = await axios.get(
      "https://api.api-ninjas.com/v1/quotes?category=success",
      {
        headers: {
          "X-Api-Key": ninjaKey,
        },
      }
    );
    setQuoteOfTheDay(response.data);
  };

  const getTodaysTimeCapsule = async () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/historicalevents?month=${currentMonth}&day=${currentDay}`,
        {
          headers: {
            "X-Api-Key": ninjaKey,
          },
        }
      );
      setTimeCapsule(response.data[0].event);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching fun facts:", error);
    }
  };

  const getFunFacts = async () => {
    const limit = 3;
    try {
      const response = await axios.get(
        "https://api.api-ninjas.com/v1/facts?limit=" + limit,
        {
          headers: {
            "X-Api-Key": ninjaKey,
          },
        }
      );
      setFunFacts(response.data);
    } catch (error) {
      console.error("Error fetching fun facts:", error);
    }
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Location Permission Denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      fetchWeather(location.coords.latitude, location.coords.longitude);
      // console.log(location);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

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

  const getWordleWord = async () => {
    const apiURL =
      "https://random-word-api.herokuapp.com/word?length=5&lang=en";

    try {
      const response = await axios.get(apiURL);

      if (response.status === 200) {
        const word = response.data;

        if (word.length > 0) {
          // No need to use JSON.stringify if word is already a string
          await AsyncStorage.setItem("wordleWord", word[0]);
          // console.log(word[0]);
        } else {
          console.log("No words found.,Wordle");
        }
      } else {
        console.log(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onRefresh = async () => {
    // Perform your data fetching or refreshing logic
    setRefreshing(true);
    setIsLoading(true);
    await AsyncStorage.removeItem("articles");

    await fetchArticlesFromStorage();
    await getLocation();

    // After fetching or refreshing, set refreshing to false to stop the loading indicator
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box backgroundColor="background.500" flex={1} safeArea>
      <HeaderBar animHeaderValue={scrollOffsetY} />
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
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
            <SkeletonCard />
          ) : (
            <>
              <WeatherCard data={weatherData} />

              {articles.map((article, index) => (
                <Fragment key={index}>
                  <ArticleCard
                    key={index}
                    title={article.articleTitle}
                    articleBody={article.articleBody}
                    imageURL={article.articleImage}
                    index={index}
                    comesFrom={"For You"}
                  />
                  {index == 1 && (
                    <Box borderColor="accent.500" borderTopWidth="2">
                      <QuoteOfTheDay quote={quoteOfTheDay} />
                    </Box>
                  )}
                  {index == 3 && (
                    <Box borderColor="accent.500" borderTopWidth="2">
                      <TimeCapsuleCard timeCapsuleText={timeCapsule} />
                    </Box>
                  )}
                  {index == 5 && (
                    <Box borderColor="accent.500" borderTopWidth="2">
                      <FunFactsCard funFacts={funFacts} />
                    </Box>
                  )}
                  {index == 7 && (
                    <Box borderColor="accent.500" borderTopWidth="2">
                      <WordleCard />
                    </Box>
                  )}
                </Fragment>
              ))}
            </>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default ForYouPage;

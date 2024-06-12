import { View, Text, ActivityIndicator } from "react-native";
import { Box, Button, ScrollView, Icon, Heading, FlatList } from "native-base";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase/config";
import FullArticle from "../components/ArticleCard";
import { Ionicons } from "@expo/vector-icons";
import CategoryArticleCard from "../components/CategoryArticleCard";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CategoryArticleSkeleton from "../components/CategoryArticleSkeleton";
import axios from "axios";

const CategoryPage = ({ route }) => {
  const category = route.params.category;
  const [articles, setArticles] = useState([]);
  const [isListLoading, setIsListLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const pageIdentifier = useRef(1);
  const limit = 10;

  useEffect(() => {
    fetchArticlesFromCategory();
  }, [category]);

  const fetchArticlesFromCategory = async () => {
    if (pageIdentifier == 1) setIsLoading(true);
    let token = await auth.currentUser.getIdToken(true);

    try {
      // if (pageIdentifier.current == 1) setIsLoading(true);
      const response = await axios.get(
        `http://192.168.0.52:3000/news/article/${category
          .replace(/ /g, "")
          .toLowerCase()}?page=${pageIdentifier}&limit=${limit}`, // Delete all white spaces and  lowercase the catgory title
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data) {
        setArticles((prevArticles) => [...prevArticles, ...response.data]);

        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnEndReached = async () => {
    pageIdentifier.current++;
    try {
      setIsListLoading(true);
      await fetchArticlesFromCategory();
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

  return (
    <Box backgroundColor="background.500" flex={1} safeArea>
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
          {category}
        </Heading>
      </Box>

      {isLoading ? (
        <CategoryArticleSkeleton />
      ) : (
        <FlatList
          flex={1}
          data={articles}
          onEndReachedThreshold={0.8}
          onEndReached={handleOnEndReached}
          ListFooterComponent={ListEndLoader}
          renderItem={({ item, index }) => (
            <CategoryArticleCard
              title={item.title}
              articleBody={item.body}
              imageURL={item.image}
            />
          )}
        />
      )}
    </Box>
  );
};

export default CategoryPage;

import { View, Text } from "react-native";
import { Box, Button, ScrollView, Icon, Heading } from "native-base";
import { useEffect, useState } from "react";
import {
  db,
  getDocs,
  query,
  collection,
  where,
  auth,
} from "../../firebase/config";
import FullArticle from "../components/ArticleCard";
import { Ionicons } from "@expo/vector-icons";
import CategoryArticleCard from "../components/CategoryArticleCard";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CategoryArticleSkeleton from "../components/CategoryArticleSkeleton";

const CategoryPage = ({ route }) => {
  const category = route.params.category;
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchArticles();
  }, [category]);

  const fetchArticles = async () => {
    setIsLoading(true);
    const date = new Date().toDateString(); // Get Data From Today
    const colRef = collection(db, "news", date, "articles");
    const q = query(colRef, where("articleCategory", "==", category));
    const articleList = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      articleList.push(doc.data());
    });
    setIsLoading(false);
    setArticles(articleList);
  };

  return (
    <Box backgroundColor="background.500" flex={1}>
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
      <ScrollView>
        <Box alignItems="center">
          {isLoading ? (
            <CategoryArticleSkeleton />
          ) : (
            articles.map((article, index) => (
              <CategoryArticleCard
                key={index}
                title={article.articleTitle}
                articleBody={article.articleBody}
                imageURL={article.articleImage}
                index={index}
                comesFrom="Category"
              />
            ))
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default CategoryPage;

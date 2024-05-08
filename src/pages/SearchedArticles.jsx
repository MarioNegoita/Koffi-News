import { Box, Button, ScrollView } from "native-base";
import ArticleCard from "../components/ArticleCard";
import React from "react";

const SearchedArticlesPage = ({ route, navigation }) => {
  const data = route.params;

  const articles = data.articles.articles.results;
  console.log(articles);

  return (
    <Box backgroundColor="background.500" flex={1} safeArea>
      <ScrollView>
        <Box alignItems="center">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              articleBody={article.body}
              imageURL={article.image}
              index={index}
              comesFrom={"Search"}
              articleUrl={article.url}
              source={article.source.uri}
            />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default SearchedArticlesPage;

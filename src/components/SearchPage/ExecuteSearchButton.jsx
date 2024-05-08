import React from "react";
import { Button, Text } from "native-base";
import axios from "axios";
import generateQueryParams from "./generateQueryParams";

const apiUrl = "http://eventregistry.org/api/v1/article/getArticles"; //DON'T FORGET TO REMOVE!!!
const apiKey = "bf3e6b17-59d4-422d-b69c-f13003a0f952"; //DON'T FORGET TO REMOVE!!!

const ExecuteSearchButton = ({
  setShowModal,
  setResults,
  setLoadedSearch,
  keywords,
  startDate,
  endDate,
  sources,
  sortBy,
  operator,
}) => {
  const fetchNews = async () => {
    setShowModal(true);
    try {
      const query = generateQueryParams(
        keywords,
        startDate,
        endDate,
        sources,
        operator
      );
      const response = await axios.post(apiUrl, {
        query,
        resultType: "articles",
        articlesSortBy: sortBy,
        apiKey: apiKey,
      });
      // console.log(JSON.stringify(query, null, 2));
      // console.log(response.data);
      setResults(response.data);

      setLoadedSearch(true);
    } catch (error) {
      console.error("Error at custom search" + error);
      throw error;
    }
  };

  return (
    <Button
      title="Search"
      mt={5}
      mb={5}
      rounded="full"
      bg="button.500"
      _pressed={{ bg: "coffee.500" }}
      onPress={() => fetchNews()}
    >
      <Text
        fontWeight="semibold"
        color="background.500"
        fontSize="lg"
        textAlign="center"
      >
        Execute search
      </Text>
    </Button>
  );
};

export default ExecuteSearchButton;

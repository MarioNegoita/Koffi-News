import React, { useState } from "react";
import {
  Box,
  Heading,
  ScrollView,
  Button,
  Text,
  Icon,
  HStack,
  Center,
} from "native-base";
import HeaderBarNotAnimated from "../components/HeaderBarNotAnimated";
import KeyWordsInput from "../components/SearchPage/KeyWordsInput";
import DateRange from "../components/SearchPage/DateRange";
import Sources from "../components/SearchPage/Sources";
import ExecuteSearchButton from "../components/SearchPage/ExecuteSearchButton";
import SortBy from "../components/SearchPage/SortBy";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import LoadingModal from "../components/SearchPage/LoadingModal";

const SearchPage = () => {
  const [sources, setSources] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [startDate, SetStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [sortBy, setSortBy] = useState("date");
  const [operator, setOperator] = useState("OR");
  const [loadedSearch, setLoadedSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState([]);

  return (
    <Box flex={1} bg="background.500" safeArea>
      <HeaderBarNotAnimated />
      {/* <LoadingModal
        showModal={showModal}
        loadedSearch={loadedSearch}
        results={results}
        setShowModal={setShowModal}
      />
      <ScrollView flex={1}>
        <Box flex={1} p={2} bg="background.500">
          <HStack justifyContent="space-between">
            <Heading
              fontSize={{
                sm: "2xl",
                md: "3xl",
                lg: "3xl",
              }}
              fontWeight="bold"
              color="primaryText.500"
              textAlign="left"
            >
              Search articles
            </Heading>
            <TouchableOpacity>
              <Box mr={2}>
                <Icon
                  color="accent.500"
                  as={<FontAwesome name="history" />}
                  size="2xl"
                />
              </Box>
            </TouchableOpacity>
          </HStack>
          <Heading
            fontSize={{
              sm: "lg",
              md: "xl",
              lg: "xl",
            }}
            fontWeight="normal"
            color="primaryText.500"
            mt={2}
          >
            Search within a wide range of sources based on specific keywords and
            conditions
          </Heading>
          <KeyWordsInput
            keywords={keywords}
            setKeywords={setKeywords}
            operator={operator}
            setOperator={setOperator}
          />
          <DateRange
            startDate={startDate}
            setStartDate={SetStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <Sources sources={sources} setSources={setSources} />
          <SortBy sortBy={sortBy} setSortBy={setSortBy} />
          <ExecuteSearchButton
            keywords={keywords}
            startDate={startDate}
            endDate={endDate}
            sources={sources}
            sortBy={sortBy}
            operator={operator}
            setShowModal={setShowModal}
            setLoadedSearch={setLoadedSearch}
            setResults={setResults}
          />
        </Box>
      </ScrollView> */}
      <Center flex={1}>
        <Heading
          fontSize={{
            sm: "2xl",
            md: "3xl",
            lg: "3xl",
          }}
          fontWeight="bold"
          color="primaryText.500"
          textAlign="left"
        >
          Still working on it, hold on tight!
        </Heading>
      </Center>
    </Box>
  );
};

export default SearchPage;

import { View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  HStack,
  Heading,
  VStack,
  Text,
  PresenceTransition,
} from "native-base";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { weatherConditions } from "../Utils/weatherConditions";
// import SkeletonCard from "../SkeletonCard";

const WeatherCard = ({ data }) => {
  const [temperature, setTemperature] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (data) handleParameters();
  }, [data]);

  const handleParameters = () => {
    setTemperature(Math.round(data?.main.temp - 273.15));
    setName(data.name);
    setDescription(data.weather[0].description);
    setHumidity(data.main.humidity);
    setVisibility(data.visibility / 1000);
    setWindSpeed(data.wind.speed);
    setIcon(data.weather[0].icon);
  };

  return (
    <PresenceTransition
      visible
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 250,
        },
      }}
    >
      <Box width="95%" mt={5} p={5} borderRadius="xl" bg="button.500">
        <Box width="100%">
          <Center>
            <Heading fontSize="5xl" color="coffee.500">
              {temperature}&deg;C
            </Heading>
            <Heading color="coffee.500" fontWeight="bold">
              {name}
            </Heading>
            <Heading color="coffee.500" fontWeight="normal">
              {description}
            </Heading>
          </Center>
          <HStack width="100%" justifyContent="space-around" mt={10}>
            <VStack justifyContent="center" alignItems="center">
              <Heading color="coffee.500" fontSize="2xl">
                {windSpeed}km/h
              </Heading>
              <Text color="coffee.500" fontSize="xl">
                Wind
              </Text>
            </VStack>
            <VStack justifyContent="center" alignItems="center">
              <Heading color="coffee.500" fontSize="2xl">
                {humidity}%
              </Heading>
              <Text color="coffee.500" fontSize="xl">
                Humidity
              </Text>
            </VStack>
            <VStack justifyContent="center" alignItems="center">
              <Heading color="coffee.500" fontSize="2xl">
                {visibility}km
              </Heading>
              <Text color="coffee.500" fontSize="xl">
                Visibility
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </PresenceTransition>
  );
};

export default WeatherCard;

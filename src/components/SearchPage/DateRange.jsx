import React, { useState } from "react";
import { Box, Button, HStack, Icon, Text } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DateRange = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const today = new Date();
  const oneMontAgo = new Date(today).setMonth(today.getMonth() - 1);

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  return (
    <Box justifyContent="space-around" mt={5}>
      <Box>
        <Text
          color="primaryText.500"
          fontWeight="bold"
          fontSize={{
            sm: "xl",
            md: "2xl",
            lg: "2xl",
          }}
        >
          Start Date
        </Text>
        <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
          <HStack
            borderWidth="2"
            borderColor="coffee.500"
            borderRadius="lg"
            alignItems="center"
          >
            <Box bg="coffee.500" mr="2" p={2}>
              <Icon
                color="background.500"
                as={<Ionicons name="calendar" />}
                size="xl"
              />
            </Box>
            <Text
              color="primaryText.500"
              fontSize={{
                sm: "xl",
                md: "2xl",
                lg: "2xl",
              }}
            >
              {startDate.toDateString()}
            </Text>
          </HStack>
        </TouchableOpacity>
      </Box>

      {showStartDatePicker && (
        <DateTimePicker
          display="calendar"
          accentColor="green"
          value={startDate}
          onChange={handleStartDateChange}
          minimumDate={oneMontAgo}
          maximumDate={today}
        />
      )}

      <Box mt={2}>
        <Text
          color="primaryText.500"
          fontWeight="bold"
          fontSize={{
            sm: "xl",
            md: "2xl",
            lg: "2xl",
          }}
        >
          End Date
        </Text>
        <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
          <HStack
            borderWidth="2"
            borderColor="coffee.500"
            borderRadius="lg"
            alignItems="center"
          >
            <Box bg="coffee.500" mr="2" p={2}>
              <Icon
                color="background.500"
                as={<Ionicons name="calendar" />}
                size="xl"
              />
            </Box>
            <Text
              color="primaryText.500"
              fontSize={{
                sm: "xl",
                md: "2xl",
                lg: "2xl",
              }}
            >
              {endDate.toDateString()}
            </Text>
          </HStack>
        </TouchableOpacity>
      </Box>

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          onChange={handleEndDateChange}
          minimumDate={oneMontAgo}
          maximumDate={today}
        />
      )}

      {/* Display selected date range
      <Text mt={4}>
        Selected Date Range: {startDate.toDateString()} -{" "}
        {endDate.toDateString()}
      </Text> */}
    </Box>
  );
};

export default DateRange;

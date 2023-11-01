import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../src/pages/Home";
import { Ionicons } from "@expo/vector-icons";
import { Icon, StatusBar } from "native-base";
import { StyleSheet } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import SectionsPage from "../src/pages/Sections";
import QuickReadsPage from "../src/pages/QuickReads";

const Tab = createBottomTabNavigator();

const BottomTabs = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: [styles.tabBar],
          tabBarLabelStyle: { fontSize: 15 },
          tabBarActiveTintColor: "#F4E7DB", // Change to the desired color
          tabBarInactiveTintColor: "#1a120b",
          // Change to the desired color
        }}
      >
        <Tab.Screen
          name="Sections"
          component={SectionsPage}
          options={{
            tabBarLabel: "Sections",
            tabBarIcon: ({ color }) => (
              <Icon as={<Ionicons name="apps" />} size="2xl" color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarLabel: "For You",
            tabBarIcon: ({ color }) => (
              <Icon
                as={<Ionicons name="analytics" />}
                size="2xl"
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Quick Reads"
          component={QuickReadsPage}
          options={{
            tabBarLabel: "Quick Reads",
            tabBarIcon: ({ color }) => (
              <Icon as={<Ionicons name="flash" />} size="2xl" color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    backgroundColor: "#A17C5B",

    // backgroundColor: "#6F4E37",
  },
});

export default BottomTabs;

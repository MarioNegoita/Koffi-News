import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../src/pages/Home";
import { Ionicons } from "@expo/vector-icons";
import { Icon, StatusBar } from "native-base";
import { StyleSheet } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";

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
          tabBarLabelStyle: { color: "white", fontSize: 15 },
          // header: () => {
          //   return <HeaderBar navigation={navigation} />;
          // },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Icon
                as={<Ionicons name="newspaper" />}
                size="2xl"
                color="white"
              />
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

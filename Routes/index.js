import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpPage from "../src/pages/auth/Signup";
import SignInPage from "../src/pages/auth/SignIn";
import NameAndAgePage from "../src/pages/onBoarding/NameAndAge";
import PickInterestsPage from "../src/pages/onBoarding/PickInterests";
import BottomTabs from "./IndexBottomTabs";
import Profile from "../src/pages/Profile";
import ArticlePage from "../src/components/Article";
import CategoryPage from "../src/pages/Category";

const Stack = createNativeStackNavigator();

const AppRouter = ({ page }) => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {page === "SignIn" ? (
            <Stack.Screen name="SignIn" component={SignInPage} />
          ) : (
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
          )}
          <Stack.Screen name="SignUp" component={SignUpPage} />
          <Stack.Screen name="NameAndAge" component={NameAndAgePage} />
          <Stack.Screen name="PickInterests" component={PickInterestsPage} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Article" component={ArticlePage} />
          <Stack.Screen name="Category" component={CategoryPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppRouter;

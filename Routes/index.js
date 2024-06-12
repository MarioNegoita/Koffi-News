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
import BookmarksPage from "../src/pages/Bookmarks";
import WordlePage from "../src/pages/Wordle";
import { SafeAreaView } from "react-native";
import SearchedArticlesPage from "../src/pages/SearchedArticles";
import Test from "../src/pages/Test";

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
            // <Stack.Screen name="Test" component={Test} /> //Uncomment after done testing
          )}
          <Stack.Screen name="SignUp" component={SignUpPage} />
          <Stack.Screen name="NameAndAge" component={NameAndAgePage} />
          <Stack.Screen name="PickInterests" component={PickInterestsPage} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Article" component={ArticlePage} />
          <Stack.Screen name="Category" component={CategoryPage} />
          <Stack.Screen name="Bookmarks" component={BookmarksPage} />
          <Stack.Screen name="Wordle" component={WordlePage} />

          <Stack.Screen
            name="SearchedArticles"
            component={SearchedArticlesPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppRouter;

import { View, Text } from "react-native";
import React from "react";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen.js";
import WelcomeScreen from "../screens/WelcomeScreen.js";
import RecipeDetailScreen from "../screens/RecipeDetailScreen.js";

const Stack = createStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome"
      
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;

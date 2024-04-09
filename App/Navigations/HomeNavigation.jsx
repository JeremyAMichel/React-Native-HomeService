import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/HomeScreen/Home";
import BusinessListByCategory from "../Screens/BusinessListByCategory/BusinessListByCategory";
import BusinessDetails from "../Screens/BusinessDetailsScreen/BusinessDetails";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home-navigation" component={Home} />
      <Stack.Screen name="business-list" component={BusinessListByCategory} />
      <Stack.Screen name="business-detail" component={BusinessDetails} />
    </Stack.Navigator>
  );
}

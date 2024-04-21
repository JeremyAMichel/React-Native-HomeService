import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BusinessDetails from "../Screens/BusinessDetailsScreen/BusinessDetails";
import Booking from "../Screens/BookingScreen/Booking";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="booking-navigation" component={Booking} />
      <Stack.Screen name="business-detail" component={BusinessDetails} />
    </Stack.Navigator>
  );
}

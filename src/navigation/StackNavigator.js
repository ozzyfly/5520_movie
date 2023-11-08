import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import NearbyCinemasScreen from "../screens/NearbyCinemasScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Nearby Cinemas" component={NearbyCinemasScreen} />
      <Stack.Screen
        name="MovieDetails" // This should match the name used in navigation.navigate()
        component={MovieDetailsScreen} // Make sure this name matches the exported component name
        options={{ title: "Movie Details" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

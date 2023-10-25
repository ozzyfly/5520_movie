import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MovieListScreen from "../screens/MovieListScreen";

const Stack = createStackNavigator();

const MovieStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MovieList"
        component={MovieListScreen}
        options={{ title: "Popular Movies" }}
      />
      {/* Additional screens can be added here */}
    </Stack.Navigator>
  );
};

export default MovieStackNavigator;

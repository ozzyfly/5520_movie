import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} />
      {/* You might want to add MovieListScreen, MovieDetailScreen, etc. here */}
    </Stack.Navigator>
  );
};

export default StackNavigator;

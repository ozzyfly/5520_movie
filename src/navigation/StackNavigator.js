import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import NearbyCinemasScreen from "../screens/NearbyCinemasScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Nearby Cinemas" component={NearbyCinemasScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

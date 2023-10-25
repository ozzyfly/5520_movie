import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReviewListScreen from "../screens/ReviewListScreen";

const Stack = createStackNavigator();

const ReviewStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReviewList"
        component={ReviewListScreen}
        options={{ title: "Movie Reviews" }}
      />
      {/* Additional screens can be added here */}
    </Stack.Navigator>
  );
};

export default ReviewStackNavigator;

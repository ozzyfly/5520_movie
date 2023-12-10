import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import UserInteractionScreen from "../screens/UserInteractionScreen";
import NotificationSetupScreen from "../screens/NotificationSetupScreen";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="User Interaction" component={UserInteractionScreen} />
      <Stack.Screen
        name="Notification Setup"
        component={NotificationSetupScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;

// BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import StackNavigator from "./StackNavigator"; // This will include the 'Main' screen and others you have defined.
import NearbyCinemasScreen from "../screens/NearbyCinemasScreen";
import ReviewListScreen from "../screens/ReviewListScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Cinemas") {
            iconName = focused ? "film" : "film-outline";
          } else if (route.name === "ReviewList") {
            iconName = focused ? "list" : "list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: "flex",
          backgroundColor: "#fff",
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={StackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ReviewList"
        component={ReviewListScreen}
        options={{ headerShown: false, title: "Review List" }}
      />
      <Tab.Screen
        name="Cinemas"
        component={NearbyCinemasScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

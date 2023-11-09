import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./BottomTabNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import NearbyCinemasScreen from "../screens/NearbyCinemasScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeDrawer">
      <Drawer.Screen
        name="HomeDrawer"
        component={BottomTabNavigator}
        options={{ drawerLabel: "Home" }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ drawerLabel: "Profile" }}
      />
      <Drawer.Screen
        name="Cinemas"
        component={NearbyCinemasScreen}
        options={{ drawerLabel: "Cinemas" }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

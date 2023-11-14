import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import BottomTabNavigator from "./BottomTabNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import NearbyCinemasScreen from "../screens/NearbyCinemasScreen";
import ReviewListScreen from "../screens/ReviewListScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="DrawerHome"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="DrawerHome"
        component={BottomTabNavigator}
        options={{ drawerLabel: "Home", title: "" }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ drawerLabel: "Profile" }}
      />
      <Drawer.Screen
        name="ReviewList"
        component={ReviewListScreen}
        options={{ drawerLabel: "Review List" }}
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

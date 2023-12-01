import { View, Button, Alert } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export default function NotificationManager() {
  const verifyPermission = async () => {
    console.log("Requesting permissions...");
    try {
      const status = await Notifications.getPermissionsAsync();

      if (status.granted) {
        console.log("Notification permission already granted.");
        return true;
      }

      const response = await Notifications.requestPermissionsAsync();

      return response.granted;
    } catch (error) {
      console.error("Error while requesting notification permissions:", error);
      return false;
    }
  };

  const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermission();

      if (!hasPermission) {
        console.log("Notification permission denied.");
        Alert.alert("You need to give permission to send notifications");
        return;
      }

      const schedulingResult = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time to Review a Movie!",
          body: "Don’t forget to create your movie review for today!",
        },
        trigger: {
          hour: 10,
          minute: 0,
          repeats: true,
        },
      });

      Alert.alert(
        "Notification Set!",
        "You will be reminded daily to create a movie review."
      );
    } catch (err) {
      console.error("Schedule notification error", err);
    }
  };

  return (
    <View>
      <Button title="Daily Reminder" onPress={scheduleNotificationHandler} />
    </View>
  );
}

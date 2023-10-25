import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import styles from "../styles/general";
import typography from "../styles/typography";

function NotificationSetupScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Text style={[typography.title, styles.header]}>
        Notification Settings
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={typography.subtitle}>Receive Movie Updates</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#FF5733" }}
          thumbColor={isEnabled ? "#f4f4f4" : "#f4f4f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

export default NotificationSetupScreen;
